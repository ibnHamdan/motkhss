import { RequestHandler } from 'express';
import { LOGGER } from '../logging';
import { ENDPOINT_CONFIGS } from '@motkhss/shared';

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  // const config = Object.values(ENDPOINT_CONFIGS).find((o) => o.url === req.url);
  // const body = config && config.sensitive ? '<redacted>' : { ...req.body };
  // console.log(req.method, req.body, '-body:', body);
  // LOGGER.info({
  //   method: req.method,
  //   path: req.path,
  //   body: Object.keys(req.body).length ? req.body : undefined,
  // });
  const config = Object.values(ENDPOINT_CONFIGS).find((o) => o.url === req.url);
  const body = config && config.sensitive ? '[REDACTED]' : { ...req.body };
  LOGGER.log({
    level: 'info',
    message: `Reauest: ${req.method} ${req.path} - body: ${JSON.stringify(body)}`,
    method: req.method,
    path: req.path,
    body,
  });
  next();
};
