import { ERRORS } from '@motkhss/shared';
import { verifyJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler, JwtObject } from '../types';
import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

export const jwtParseMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next();
  }

  let payload: JwtObject;

  try {
    payload = verifyJwt(token);
  } catch (e) {
    const verifyErr = e as VerifyErrors;
    if (verifyErr instanceof TokenExpiredError) {
      return res.status(401).send({ error: ERRORS.TOKEN_EXPIRED });
    }
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }

  const user = await db.getUserById(payload.userId);
  if (!user) {
    return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
  }
  res.locals.userId = user.id;
  return next();
};

export const enforceJwtMiddlware: ExpressHandler<any, any> = async (_, res, next) => {
  if (!res.locals.userId) {
    return res.sendStatus(401);
  }
  return next();
};
