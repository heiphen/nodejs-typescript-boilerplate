import 'module-alias/register';
import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import requestIp from 'request-ip';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { Handlers } from '@sentry/node';

import { healthRouter } from '@health/health-controller';
import {
  validateRecaptcha,
  initSentry,
  generateErrorMessage,
  TOO_MANY_REQUESTS_ERROR,
  initDbClient,
} from '@utils';

(async () => {
  config();
  await initDbClient();

  const app = express();

  app.use('/', helmet());
  app.use('/', cors());
  app.use('/', requestIp.mw());
  app.use(express.json({ limit: '10kb' }));

  if (process.env.NODE_ENV === 'production') {
    /* ----------------------------------------------------------*
                    Production
    *-----------------------------------------------------------*/
    initSentry(app);
    app.use(Handlers.requestHandler());
    app.use(Handlers.tracingHandler());

    app.use('/', mongoSanitize());
    app.use('/', xss());
    app.use(validateRecaptcha());
    app.use(
      rateLimit({
        max: Number(process.env.RATE_LIMIT_MAX || 600),
        handler: (req: Request, res: Response) => {
          res.status(429).json(generateErrorMessage(TOO_MANY_REQUESTS_ERROR));
        },
      })
    );
  }

  app.use('/', healthRouter());

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at', process.env.PORT || 3000);
  });
})();
