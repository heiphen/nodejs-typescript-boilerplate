import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { config } from 'dotenv';
import { Application } from 'express';

config();

export function initSentry(app: Application) {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });
}
