import fs from 'fs/promises';
import path from 'path';

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

interface RouteMeta {
  basePath: string;
  tag: string;
  deprecated?: boolean;
  deprecationNotice?: string;
}

const ROUTE_FILES: Record<string, RouteMeta> = {
  authRoutes: {
    basePath: '/api/v1/auth',
    tag: 'auth',
  },
  directoryRoutes: {
    basePath: '/api/v1/directory',
    tag: 'directory',
  },
  phase1Routes: {
    basePath: '/api/v1/phase1',
    tag: 'legacy-phase1',
    deprecated: true,
    deprecationNotice: 'Legacy phase1 endpoint family. Disabled by default (410) unless ENABLE_LEGACY_PHASE1=true.',
  },
  sasiRoutes: {
    basePath: '/api/v1/sasi',
    tag: 'sasi',
  },
  titleRegistrationRoutes: {
    basePath: '/api/v1/title-registrations',
    tag: 'legacy-title-registrations',
    deprecated: true,
    deprecationNotice: 'Legacy title-registration endpoint family. Disabled by default (410) unless ENABLE_LEGACY_PHASE1=true.',
  },
  titleRegistrationWorkflowRoutes: {
    basePath: '/api/v1/title-registration',
    tag: 'title-registration',
  },
};

function toOpenApiPath(route: string): string {
  return route.replace(/:([A-Za-z0-9_]+)/g, '{$1}');
}

function methodOperationId(method: HttpMethod, fullPath: string): string {
  const normalized = fullPath
    .replace(/[{}]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
  return `${method}_${normalized}`;
}

async function readRoutes(routeFilePath: string): Promise<Array<{ method: HttpMethod; route: string }>> {
  const source = await fs.readFile(routeFilePath, 'utf8');
  const pattern = /router\.(get|post|patch|put|delete)\(\s*'([^']+)'/gm;
  const routes: Array<{ method: HttpMethod; route: string }> = [];
  let match = pattern.exec(source);
  while (match) {
    routes.push({
      method: match[1] as HttpMethod,
      route: match[2],
    });
    match = pattern.exec(source);
  }
  return routes;
}

function buildSpec(paths: Record<string, Record<string, unknown>>): Record<string, unknown> {
  return {
    openapi: '3.0.3',
    info: {
      title: 'FHD Process Automation API',
      version: '1.0.0',
      description: 'Auto-generated OpenAPI contract from route definitions. Do not edit the generated JSON manually.',
    },
    servers: [
      { url: '/api/v1', description: 'Primary v1 API base' },
    ],
    tags: [
      { name: 'auth' },
      { name: 'directory' },
      { name: 'sasi' },
      { name: 'title-registration' },
      { name: 'legacy-phase1', description: 'Legacy endpoints; disabled by default and planned for retirement.' },
      { name: 'legacy-title-registrations', description: 'Legacy endpoints; disabled by default and planned for retirement.' },
    ],
    paths,
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          required: ['message', 'code', 'details'],
          properties: {
            message: { type: 'string' },
            code: { type: 'string' },
            details: { type: 'object', additionalProperties: true },
          },
        },
      },
    },
    'x-api-versioning-policy': {
      currentMajor: 'v1',
      breakingChangePolicy: 'Breaking changes require /api/v2 rollout or explicit deprecation window with headers.',
      legacySunset: {
        phase1AndTitleRegistrations: {
          freezeDate: '2026-03-31',
          hardRemovalTargetDate: '2026-06-30',
          defaultBehavior: '410 Gone when ENABLE_LEGACY_PHASE1=false',
        },
      },
    },
  };
}

async function generate(): Promise<void> {
  const serverRoot = path.resolve(__dirname, '../..');
  const routesDir = path.join(serverRoot, 'src/api/v1/routes');
  const outputDir = path.join(serverRoot, 'openapi');
  const outputFile = path.join(outputDir, 'openapi.v1.json');

  const pathMap: Record<string, Record<string, unknown>> = {};

  const routeFileNames = Object.keys(ROUTE_FILES).sort();
  for (const routeFileBaseName of routeFileNames) {
    const routeFilePath = path.join(routesDir, `${routeFileBaseName}.ts`);
    const meta = ROUTE_FILES[routeFileBaseName];
    const routes = await readRoutes(routeFilePath);
    for (const route of routes) {
      const fullPath = `${meta.basePath}${route.route === '/' ? '' : route.route}`;
      const normalizedPath = toOpenApiPath(fullPath);
      const method = route.method;
      const operation: Record<string, unknown> = {
        tags: [meta.tag],
        operationId: methodOperationId(method, normalizedPath),
        summary: `${method.toUpperCase()} ${normalizedPath}`,
        responses: {
          '200': { description: 'Success' },
          '400': {
            description: 'Bad request',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          '401': {
            description: 'Authentication required',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          '403': {
            description: 'Forbidden',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          '404': {
            description: 'Not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          '410': {
            description: 'Gone (legacy endpoint disabled)',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          '500': {
            description: 'Internal server error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      };
      if (method !== 'get') {
        operation.requestBody = {
          required: false,
          content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } },
        };
      }
      if (meta.deprecated) {
        operation.deprecated = true;
        operation.description = meta.deprecationNotice;
      }
      if (!pathMap[normalizedPath]) {
        pathMap[normalizedPath] = {};
      }
      pathMap[normalizedPath][method] = operation;
    }
  }

  const sortedPathMap = Object.fromEntries(
    Object.entries(pathMap).sort(([a], [b]) => a.localeCompare(b)),
  );

  const spec = buildSpec(sortedPathMap);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(spec, null, 2)}\n`, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Generated ${path.relative(serverRoot, outputFile)}`);
}

generate().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to generate OpenAPI spec:', error);
  process.exit(1);
});
