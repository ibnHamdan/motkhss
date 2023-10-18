import {
  CreateOpportunityRequest,
  CreateOpportunityResponse,
  ListOpportunitiesRequest,
  ListOpportunitiesResponse,
} from '../api';
import { db } from '../datastore';
import { ExpressHandler } from '../types';

export const listOpportunitiesHandler: ExpressHandler<ListOpportunitiesRequest, ListOpportunitiesResponse> = (
  req,
  res
) => {
  throw new Error('Ooops!');
  res.send({ opportunities: db.listOpportunities() });
};

export const createOpportunityHandler: ExpressHandler<CreateOpportunityRequest, CreateOpportunityResponse> = (
  req,
  res
) => {
  if (!req.body.userId || !req.body.title || !req.body.url) {
    return res.sendStatus(403);
  }

  // TODO: VALIDATE USER EXISTS
  // TODO: GET USER id from session
  // TODO: validate title and url is not empty,

  const opportunity = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  db.creatOpportunity(opportunity);
  res.sendStatus(200);
};
