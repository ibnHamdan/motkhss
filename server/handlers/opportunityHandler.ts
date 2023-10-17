import { db } from '../datastore';
import { ExpressHandler, Opportunity } from '../types';

export const listOpportunitiesHandler: ExpressHandler<{}, {}> = (
  req,
  res
) => {
  res.send({ opportunities: db.listOpportunities() });
};

type CreateOpportunityRequest = Pick<
  Opportunity,
  'title' | 'url' | 'userId'
>;
interface CreateOpportunityResponse {}

export const createOpportunityHandler: ExpressHandler<
  CreateOpportunityRequest,
  CreateOpportunityResponse
> = (req, res) => {
  if (!req.body.userId || !req.body.title || !req.body.url) {
    return res.sendStatus(403);
  }
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
