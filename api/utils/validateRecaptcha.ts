import axios from 'axios';
import { NextFunction, Response } from 'express';
import { generateErrorMessage, INVALID_RECAPTCHA_CODE } from '@utils';
import { ErrorHandler } from '.';

async function checkRecaptcha(token, clientIp) {
  if (!token) throw new ErrorHandler(INVALID_RECAPTCHA_CODE);
  /* ----------------------------------------------------------*
                    Google Recaptcha
  *-----------------------------------------------------------*/
  const { data } = await axios({
    method: 'POST',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: {
      secret: process.env.RECAPTCHA_SITE_SECRET,
      response: token,
      remoteip: clientIp,
    },
  });
  if (!data.success) throw new ErrorHandler(INVALID_RECAPTCHA_CODE);
}

export function validateRecaptcha() {
  return async (req: any, res: Response, next: NextFunction) => {
    /* ----------------------------------------------------------*
                    Check Request method
    *-----------------------------------------------------------*/
    if (
      req.method === 'PUT' ||
      req.method === 'POST' ||
      req.method === 'DELETE' ||
      req.method === 'PATCH'
    ) {
      try {
        const token = req.headers['x-recaptcha-token'];
        await checkRecaptcha(token, req.clientIp);
        next();
      } catch (err) {
        return res
          .status(401)
          .send(generateErrorMessage(INVALID_RECAPTCHA_CODE));
      }
      /* ----------------------------------------------------------*
                    Pass other requests
      *-----------------------------------------------------------*/
    } else {
      next();
    }
  };
}
