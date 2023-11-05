import {
  Comment,
  CountCommentResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
  ERRORS,
  ListCommentsResponse,
} from '@motkhss/shared';
import { Datastore } from '../datastore';
import { ExpressHandlerWithParams } from '../types';
import crypto from 'crypto';

export class CommentHandler {
  private db: Datastore;
  public count: ExpressHandlerWithParams<{ opportunityId: string }, null, CountCommentResponse> = async (req, res) => {
    if (!req.params.opportunityId) {
      return res.status(400).send({ error: 'Opportunity ID missing' });
    }

    const count = await this.db.countComment(req.params.opportunityId);
    return res.send({ count });
  };
  public create: ExpressHandlerWithParams<{ opportunityId: string }, CreateCommentRequest, CreateCommentResponse> =
    async (req, res) => {
      if (!req.params.opportunityId) return res.status(400).send({ error: ERRORS.OPPORTUNITY_ID_MISSING });
      if (!req.body.comment) return res.status(400).send({ error: ERRORS.COMMENT_ID_MISSING });

      if (!(await this.db.getOpportunity(req.params.opportunityId, res.locals.userId))) {
        return res.status(404).send({ error: ERRORS.OPPORTUNITY_NOT_FOUND });
      }
      const commentForInsertion: Comment = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        opportunityId: req.params.opportunityId,
        userId: res.locals.userId,
        comment: req.body.comment,
      };
      await this.db.createComment(commentForInsertion);
      return res.sendStatus(200);
    };
  public delete: ExpressHandlerWithParams<{ id: string }, null, DeleteCommentResponse> = async (req, res) => {
    if (!req.params.id) return res.status(404).send({ error: ERRORS.COMMENT_ID_MISSING });
    await this.db.deleteComment(req.params.id);
    return res.sendStatus(200);
  };
  public list: ExpressHandlerWithParams<{ opportunityId: string }, null, ListCommentsResponse> = async (req, res) => {
    if (!req.params.opportunityId) {
      return res.status(400).send({ error: ERRORS.OPPORTUNITY_ID_MISSING });
    }

    const comments = await this.db.listComments(req.params.opportunityId);

    return res.send({ comments });
  };

  constructor(db: Datastore) {
    this.db = db;
  }
}
