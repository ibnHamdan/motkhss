import express from 'express';
import { createOpportunityHandler, listOpportunitiesHandler } from './handlers/opportunityHandler';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorrMiddleware';

(async () => {
  await initDB();
  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  app.get('/v1/opportunities', asyncHandler(listOpportunitiesHandler));
  app.post('/v1/opportunities', asyncHandler(createOpportunityHandler));

  app.post('/v1/signup', asyncHandler(signUpHandler));
  app.post('/v1/signin', asyncHandler(signInHandler));

  app.use(errHandler);

  app.listen(3000);
})();
