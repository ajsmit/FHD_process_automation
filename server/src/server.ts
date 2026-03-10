import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import api from './api/v1';
import { validateAuthStartupGuardrails } from './auth/startupAuthGuardrails';
import { initDb } from './db/initDb';

// Load environment variables
dotenv.config({ path: process.cwd() + '/.env' });


const app = express();
const port = process.env.PORT || 3001;
const nodeEnv = (process.env.NODE_ENV ?? 'development').trim().toLowerCase();
const isProduction = nodeEnv === 'production';

function resolveAllowedCorsOrigins(): Set<string> {
  const configured = (process.env.CORS_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (configured.length > 0) {
    return new Set(configured);
  }

  const fallback = new Set<string>();
  const externalProfileBase = process.env.EXTERNAL_PROFILE_BASE_URL?.trim();
  if (externalProfileBase) {
    try {
      fallback.add(new URL(externalProfileBase).origin);
    } catch {
      // Ignore malformed URL in fallback resolution.
    }
  }

  if (!isProduction) {
    fallback.add('http://localhost:3000');
    fallback.add('http://127.0.0.1:3000');
  }

  return fallback;
}

const allowedCorsOrigins = resolveAllowedCorsOrigins();
if (isProduction && allowedCorsOrigins.size === 0) {
  console.warn('CORS_ALLOWED_ORIGINS is empty in production; browser-origin requests will be rejected.');
}

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (!isProduction && allowedCorsOrigins.size === 0) {
        callback(null, true);
        return;
      }
      if (allowedCorsOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/generated_forms', express.static(path.resolve(__dirname, '../../generated_forms')));
app.use('/ridiculous_forms', express.static(path.resolve(__dirname, '../../ridiculous_forms')));

// API routes
app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.json({ status: 'API_UP', message: 'Use Next.js client on port 3000 and API on /api/v1' });
});


// Start the server
async function start() {
  validateAuthStartupGuardrails();
  const shouldInitDb = (process.env.AUTO_INIT_DB ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true')).trim().toLowerCase() === 'true';
  if (shouldInitDb) {
    await initDb();
  } else {
    console.log('AUTO_INIT_DB=false: skipping automatic schema/data bootstrap.');
  }
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});
