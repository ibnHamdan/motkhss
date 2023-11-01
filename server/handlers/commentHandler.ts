import {
  Comment,
  CountCommentResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
  ListCommentsResponse,
} from '@motkhss/shared';
import { Datastore } from '../datastore';
import { ExpressHandlerWithParams } from '../types';

export class CommentHandler {
  private db: Datastore;
  public count: ExpressHandlerWithParams<{ opportunityId: string }, null, CountCommentResponse> = async (req, res) => {
    if (!req.params.opportunityId) {
      return res.status(400).send({ error: 'Opportunity ID missing' });
    }

    const count = await this.db.countComment(req.params.opportunityId);
    return res.send({ count });
  };
  public createCommentHandler: ExpressHandlerWithParams<
    { opportunityId: string },
    CreateCommentRequest,
    CreateCommentResponse
  > = async (req, res) => {
    if (!req.params.opportunityId) return res.status(400).send({ error: 'opportunity ID is missing' });
    if (!req.body.comment) return res.status(400).send({ error: 'Comment is missing' });

    if (!(await this.db.getOpportunity(req.params.opportunityId))) {
      return res.status(404).send({ error: 'No opportunity found with this ID' });
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
  public deleteCommentHandler: ExpressHandlerWithParams<{ id: string }, null, DeleteCommentResponse> = async (
    req,
    res
  ) => {
    if (!req.params.id) return res.status(404).send({ error: 'No Comment Id' });
    await this.db.deleteComment(req.params.id);
    return res.sendStatus(200);
  };
  public listCommentsHandler: ExpressHandlerWithParams<{ opportunityId: string }, null, ListCommentsResponse> = async (
    req,
    res
  ) => {
    if (!req.params.opportunityId) {
      return res.status(400).send({ error: 'opportunity ID missing' });
    }

    const comments = await this.db.listComments(req.params.opportunityId);

    return res.send({ comments });
  };

  constructor(db: Datastore) {
    this.db = db;
  }
}
