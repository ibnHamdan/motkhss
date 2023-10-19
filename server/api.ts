import { Opportunity, User } from './types';

// Opportunity APT
export interface ListOpportunitiesRequest {}
export interface ListOpportunitiesResponse {
  opportunities: Opportunity[];
}

export type CreateOpportunityRequest = Pick<Opportunity, 'title' | 'url' | 'userId'>;
export interface CreateOpportunityResponse {}

export interface GetOpportunityRequest {}
export interface GetOpportunityResponse {
  opportunity: Opportunity;
}

// Comment APIs

// Like APIs

// User APIs
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'password'>;
export interface SignUpResponse {}

export interface SignInRequest {
  login: string; // username or email
  password: string;
}

export type SignInResponse = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>;
