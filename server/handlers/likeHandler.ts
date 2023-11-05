import { ERRORS, Like, ListLikesResponse } from '@motkhss/shared';
import { Datastore } from '../datastore';
import { ExpressHandlerWithParams } from '../types';

export class LikeHandler {
  private db: Datastore;
  public create: ExpressHandlerWithParams<{ opportunityId: string }, null, {}> = async (req, res) => {
    if (!req.params.opportunityId) {
      return res.status(400).send({ error: ERRORS.OPPORTUNITY_ID_MISSING });
    }
    if (!(await this.db.getOpportunity(req.params.opportunityId, res.locals.userId))) {
      return res.status(404).send({ error: ERRORS.OPPORTUNITY_NOT_FOUND });
    }

    let found = await this.db.exists({
      opportunityId: req.params.opportunityId,
      userId: res.locals.userId,
    });
    if (found) {
      return res.status(400).send({ error: ERRORS.DUPLICATE_LIKE });
    }

    const likeForInsert: Like = {
      opportunityId: req.params.opportunityId,
      userId: res.locals.userId,
    };

    this.db.createLike(likeForInsert);
    return res.sendStatus(200);
  };
  public list: ExpressHandlerWithParams<{ postId: string }, null, ListLikesResponse> = async (req, res) => {
    if (!req.params.postId) {
      return res.status(400).send({ error: ERRORS.OPPORTUNITY_ID_MISSING });
    }
    const count: Number = await this.db.getLikes(req.params.postId);
    return res.send({ likes: count });
  };

  constructor(db: Datastore) {
    this.db = db;
  }

  public delete: ExpressHandlerWithParams<{ opportunityId: string }, null, {}> = async (req, res) => {
    if (!req.params.opportunityId) {
      return res.status(400).send({ error: ERRORS.OPPORTUNITY_ID_MISSING });
    }
    if (!(await this.db.getOpportunity(req.params.opportunityId, res.locals.userId))) {
      return res.status(404).send({ error: ERRORS.OPPORTUNITY_NOT_FOUND });
    }

    const likeForDelete: Like = {
      opportunityId: req.params.opportunityId,
      userId: res.locals.userId,
    };

    this.db.deleteLike(likeForDelete);
    return res.sendStatus(200);
  };
}
