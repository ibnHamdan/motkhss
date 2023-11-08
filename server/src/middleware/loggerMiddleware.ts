import { ENDPOINT_CONFIGS } from '@motkhss/shared';
import { RequestHandler } from 'express';

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  const config = Object.values(ENDPOINT_CONFIGS).find((o) => o.url === req.url);
  const body = config && config.sensitive ? '<redacted>' : { ...req.body };
  console.log(req.method, req.body, '-body:', body);
  next();
};
