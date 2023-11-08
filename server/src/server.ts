import { db, initDB } from './datastore';

import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorrMiddleware';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import mixpanel from 'mixpanel';
import asyncHandler from 'express-async-handler';
import { OpportunityHandler } from './handlers/opportunityHandler';
import { enforceJwtMiddlware, jwtParseMiddleware } from './middleware/authMiddleware';
import { LikeHandler } from './handlers/likeHandler';
import { CommentHandler } from './handlers/commentHandler';
import { ENDPOINT_CONFIGS, Endpoints, TrackRequest } from '@motkhss/shared';
import { UserHandler } from './handlers/userHandler';
import { LOGGER } from './logging';
import { ExpressHandler } from './types';

export async function createServer(logRequest: boolean = true) {
  const dbPath = process.env.DB_PATH;

  if (!dbPath) {
    LOGGER.error('DB_PATH env var missing');
    process.exit(1);
  }
  await initDB(dbPath);

  const mixpanelToken = process.env.MIXPANEL_TOKEN;
  if (!mixpanelToken) {
    LOGGER.error('MIXPANEL_TOKEN env var is missing');
    process.exit(1);
  }
  const mixpanelTracker = mixpanel.init(mixpanelToken);

  const trackHandler: ExpressHandler<TrackRequest, any> = (req, res) => {
    if (!req.body.eventName) {
      return res.status(400).send({ error: 'Missing event name' });
    }
    mixpanelTracker.track(req.body.eventName, req.body.payload ?? {}, undefined);
    res.send({ status: 'ok' });
  };

  const app = express();

  app.use(express.json());
  app.use(cors());

  if (logRequest) {
    app.use(requestLoggerMiddleware);
  }

  const userHandler = new UserHandler(db);
  const opportunityHandler = new OpportunityHandler(db);
  const likeHandler = new LikeHandler(db);
  const commentHandler = new CommentHandler(db);

  //  Map of endpoints handlers
  const HANDLERS: { [key in Endpoints]: RequestHandler<any, any> } = {
    [Endpoints.signin]: userHandler.signIn,
    [Endpoints.signup]: userHandler.signUp,
    [Endpoints.getUser]: userHandler.get,
    [Endpoints.getCurrentUser]: userHandler.getCurrent,
    [Endpoints.updateCurrentUser]: userHandler.updateCurrentUser,

    [Endpoints.listOpportunities]: opportunityHandler.list,
    [Endpoints.getOpportunity]: opportunityHandler.get,
    [Endpoints.createOpportunity]: opportunityHandler.create,
    [Endpoints.deleteOpportunity]: opportunityHandler.delete,

    [Endpoints.listLikes]: likeHandler.list,
    [Endpoints.createLike]: likeHandler.create,
    [Endpoints.deleteLike]: likeHandler.delete,

    [Endpoints.listComments]: commentHandler.list,
    [Endpoints.createComment]: commentHandler.create,
    [Endpoints.deleteComment]: commentHandler.delete,
    [Endpoints.countComments]: commentHandler.count,

    [Endpoints.healthz]: (_, res) => res.send({ status: 'OK' }),
    [Endpoints.track]: trackHandler,
  };

  // Register handlers in express
  Object.keys(Endpoints).forEach((entry) => {
    const config = ENDPOINT_CONFIGS[entry as Endpoints];
    const handler = HANDLERS[entry as Endpoints];

    config.auth
      ? app[config.method](config.url, jwtParseMiddleware, enforceJwtMiddlware, asyncHandler(handler))
      : app[config.method](config.url, jwtParseMiddleware, asyncHandler(handler));
  });

  app.use(errHandler);

  const { ENV } = process.env;
  if (!ENV) {
    throw 'Environment not defined, make sure to pass in env vars or have a .env file at root.';
  }

  // if (ENV === 'production') {
  //   const key = fs.readFileSync('/home/motkhss-user/certs/motkhss.com/privkey.pem', 'utf-8');
  //   const cert = fs.readFileSync('/home/motkhss-user/certs/motkhss.com/cert.pem', 'utf-8');

  //   return https.createServer({ key, cert }, app);
  // } else {
  //   return http.createServer(app);
  // }

  return app;
}
