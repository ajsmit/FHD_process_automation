type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: unknown;
}

function normalizeError(error: unknown): Record<string, unknown> | undefined {
  if (!error) return undefined;
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { value: String(error) };
}

function write(level: LogLevel, message: string, meta: LogMeta = {}): void {
  const payload: Record<string, unknown> = {
    ts: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  const serialized = JSON.stringify(payload);
  if (level === 'error') {
    console.error(serialized);
    return;
  }
  if (level === 'warn') {
    console.warn(serialized);
    return;
  }
  console.log(serialized);
}

export const logger = {
  debug(message: string, meta?: LogMeta): void {
    write('debug', message, meta);
  },
  info(message: string, meta?: LogMeta): void {
    write('info', message, meta);
  },
  warn(message: string, meta?: LogMeta): void {
    write('warn', message, meta);
  },
  error(message: string, meta: LogMeta = {}): void {
    write('error', message, {
      ...meta,
      error: normalizeError(meta.error),
    });
  },
};

