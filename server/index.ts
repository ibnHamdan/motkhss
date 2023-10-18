import express, { ErrorRequestHandler, RequestHandler } from 'express';
import { createOpportunityHandler, listOpportunitiesHandler } from './handlers/opportunityHandler';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';

(async () => {
  await initDB();
  const app = express();

  app.use(express.json());

  const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, '-body:', req.body);
    next();
  };

  app.use(requestLoggerMiddleware);

  app.get('/v1/opportunities', asyncHandler(listOpportunitiesHandler));

  app.post('/v1/opportunities', asyncHandler(createOpportunityHandler));

  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('Uncaught exception from errHandler:', err);
    return res.status(500).send('Oops, an unexpected error occurred, please try agnin');
  };

  app.use(errHandler);

  app.listen(3000);
})();
