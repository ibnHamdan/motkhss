import express from 'express';
import { createOpportunityHandler, listOpportunitiesHandler } from './handlers/opportunityHandler';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorrMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
(async () => {
  await initDB();
  dotenv.config();
  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  // Public endpoint
  app.get('/healthz', (req, res) => res.send({ status: '  OK ✌️ ' }));

  app.get('/v1/opportunities', asyncHandler(listOpportunitiesHandler));

  app.post('/v1/signup', asyncHandler(signUpHandler));
  app.post('/v1/signin', asyncHandler(signInHandler));

  app.use(authMiddleware);

  // Protected endpoints
  app.post('/v1/opportunities', asyncHandler(createOpportunityHandler));

  app.use(errHandler);

  app.listen(process.env.PORT || 3000);
})();
