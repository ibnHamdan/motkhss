import { RequestHandler } from 'express';
import { LOGGER } from '../logging';

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  // const config = Object.values(ENDPOINT_CONFIGS).find((o) => o.url === req.url);
  // const body = config && config.sensitive ? '<redacted>' : { ...req.body };
  // console.log(req.method, req.body, '-body:', body);
  LOGGER.info({
    method: req.method,
    path: req.path,
    body: Object.keys(req.body).length ? req.body : undefined,
  });
  next();
};
