import express from 'express';
import { createOpportunityHandler, listOpportunitiesHandler } from './handlers/opportunityHandler';
import asyncHandler from 'express-async-handler';
import { initDB } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorrMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
import https from 'https';
import fs from 'fs';

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

  const port = process.env.PORT;
  const env = process.env.ENV;

  const listener = () => console.log(`Listening on prot ${port} on ${env} envirnoment`);

  if (env === 'production') {
    const key = fs.readFileSync('/home/motkhss-user/certs/motkhss.com/privkey.pem', 'utf-8');
    const cert = fs.readFileSync('/home/motkhss-user/certs/motkhss.com/cert.pem', 'utf-8');

    https.createServer({ key, cert }, app).listen(port, listener);
  } else {
    app.listen(port, listener);
  }
})();
