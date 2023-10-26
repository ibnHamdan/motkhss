import {
  Opportunity,
  CreateOpportunityRequest,
  CreateOpportunityResponse,
  DeleteOpportunityRequest,
  DeleteOpportunityResponse,
  GetOpportunityResponse,
  ListOpportunitiesRequest,
  ListOpportunitiesResponse,
} from '@motkhss/shared';
import { Datastore } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';

export class OpportunityHandler {
  private db: Datastore;

  constructor(db: Datastore) {
    this.db = db;
  }

  public listOpportunitiesHandler: ExpressHandler<ListOpportunitiesRequest, ListOpportunitiesResponse> = async (
    req,
    res
  ) => {
    res.send({ opportunities: await this.db.listOpportunities() });
  };

  public createOpportunityHandler: ExpressHandler<CreateOpportunityRequest, CreateOpportunityResponse> = async (
    req,
    res
  ) => {
    if (!req.body.title || !req.body.url) {
      return res.sendStatus(403);
    }

    // TODO: VALIDATE USER EXISTS
    // TODO: validate title and url is not empty,

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

  public deleteOpportunityHandler: ExpressHandler<DeleteOpportunityRequest, DeleteOpportunityResponse> = async (
    req,
    res
  ) => {
    if (!req.body.opportunityId) {
      return res.sendStatus(400);
    }
    this.db.deleteOpportunity(req.body.opportunityId);
    return res.sendStatus(200);
  };

  public getOpportunityHandler: ExpressHandlerWithParams<{ id: string }, null, GetOpportunityResponse> = async (
    req,
    res
  ) => {
    if (!req.params.id) return res.sendStatus(400);

    const OpportunityToReturn: Opportunity | undefined = await this.db.getOpportunity(req.params.id);
    return res.send({ opportunity: OpportunityToReturn });
  };
}
