import {
  Opportunity,
  CreateOpportunityRequest,
  CreateOpportunityResponse,
  DeleteOpportunityRequest,
  DeleteOpportunityResponse,
  GetOpportunityResponse,
  ListOpportunitiesRequest,
  ListOpportunitiesResponse,
  ERRORS,
} from '@motkhss/shared';
import { Datastore } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';
import crypto from 'crypto';

export class OpportunityHandler {
  private db: Datastore;
  public create: ExpressHandler<CreateOpportunityRequest, CreateOpportunityResponse> = async (req, res) => {
    if (!req.body.title || !req.body.url) {
      return res.sendStatus(403);
    }

    // TODO: VALIDATE USER EXISTS
    // TODO: validate title and url is not empty,

    const existing = await this.db.getOpportunityByUrl(req.body.url);
    if (existing) {
      return res.status(400).send({ error: ERRORS.DUPLICATE_URL });
    }

    const opportunity = {
      id: crypto.randomUUID(),
      postedAt: Date.now(),
      title: req.body.title,
      url: req.body.url,
      userId: res.locals.userId,
    };
    await this.db.creatOpportunity(opportunity);
    res.sendStatus(200);
  };
  public delete: ExpressHandler<DeleteOpportunityRequest, DeleteOpportunityResponse> = async (req, res) => {
    if (!req.body.opportunityId) {
      return res.sendStatus(400);
    }
    this.db.deleteOpportunity(req.body.opportunityId);
    return res.sendStatus(200);
  };
  public get: ExpressHandlerWithParams<{ id: string }, null, GetOpportunityResponse> = async (req, res) => {
    if (!req.params.id) return res.sendStatus(400);

    const OpportunityToReturn: Opportunity | undefined = await this.db.getOpportunity(req.params.id, res.locals.userId);
    return res.send({ opportunity: OpportunityToReturn });
  };
  public list: ExpressHandler<ListOpportunitiesRequest, ListOpportunitiesResponse> = async (req, res) => {
    const userId = res.locals.userId;
    res.send({ opportunities: await this.db.listOpportunities(userId) });
  };

  constructor(db: Datastore) {
    this.db = db;
  }
}
