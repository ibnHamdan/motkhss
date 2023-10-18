import { Opportunity } from './types';

// Opportunity APT
export interface ListOpportunitiesRequest {}
export interface ListOpportunitiesResponse {
  opportunities: Opportunity[];
}

export type CreateOpportunityRequest = Pick<
  Opportunity,
  'title' | 'url' | 'userId'
>;
export interface CreateOpportunityResponse {}

export interface GetOpportunityRequest {}
export interface GetOpportunityResponse {
  opportunity: Opportunity;
}

// Comment APIs

// Like APIs

// User APIs
