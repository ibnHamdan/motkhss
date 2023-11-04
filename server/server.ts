import { /*db,*/ db, initDB } from './datastore';

import { requestLoggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorrMiddleware';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import asyncHandler from 'express-async-handler';
import { OpportunityHandler } from './handlers/opportunityHandler';
import { enforceJwtMiddlware, jwtParseMiddleware } from './middleware/authMiddleware';
import { LikeHandler } from './handlers/likeHandler';
import { CommentHandler } from './handlers/commentHandler';
import { ENDPOINT_CONFIGS, Endpoints } from '@motkhss/shared';
import http from 'http';
import path from 'path';
import { UserHandler } from './handlers/userHandler';

export async function createServer(dbPath: string, logRequest: boolean = true) {
  await initDB(dbPath);

  dotenv.config();

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/', express.static(path.join(__dirname, '../web/build')));

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

    [Endpoints.listOpportunities]: opportunityHandler.list,
    [Endpoints.getOpportunity]: opportunityHandler.get,
    [Endpoints.createOpportunity]: opportunityHandler.create,
    [Endpoints.deleteOpportunity]: opportunityHandler.delete,

    [Endpoints.listLikes]: likeHandler.list,
    [Endpoints.createLike]: likeHandler.create,
    [Endpoints.deleteLike]: likeHandler.delete,

    [Endpoints.listComments]: commentHandler.listCommentsHandler,
    [Endpoints.createComment]: commentHandler.createCommentHandler,
    [Endpoints.deleteComment]: commentHandler.deleteCommentHandler,
    [Endpoints.countComments]: commentHandler.count,

    [Endpoints.healthz]: (_, res) => res.send({ status: 'OK' }),
  };

  // Register handlers in express
  Object.keys(Endpoints).forEach((entry) => {
    const config = ENDPOINT_CONFIGS[entry as Endpoints];
    const handler = HANDLERS[entry as Endpoints];

    config.auth
      ? app[config.method](config.url, jwtParseMiddleware, enforceJwtMiddlware, asyncHandler(handler))
      : app[config.method](config.url, asyncHandler(handler));
  });

  app.use(errHandler);

  const { ENV } = process.env;

  if (ENV === 'production') {
    const key = fs.readFileSync('/home/motkhss-user/certs/motkhss.com/privkey.pem', 'utf-8');
    const cert = fs.readFileSync('/home/motkhss-user/certs/motkhss.com/cert.pem', 'utf-8');

    return https.createServer({ key, cert }, app);
  } else {
    return http.createServer(app);
  }
}
