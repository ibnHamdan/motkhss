import { Comment, Opportunity, User } from './types';

// Opportunity APIs
export interface ListOpportunitiesRequest {}
export interface ListOpportunitiesResponse {
  opportunities: Opportunity[];
}

export type CreateOpportunityRequest = Pick<Opportunity, 'title' | 'url'>;
export interface CreateOpportunityResponse {}

export interface GetOpportunityRequest {}
export interface GetOpportunityResponse {
  opportunity: Opportunity;
}

export type DeleteOpportunityRequest = { opportunityId: string };
export type DeleteOpportunityResponse = {};

// Comment APIs

export type CreateCommentRequest = Pick<Comment, 'comment'>;
export interface CreateCommentResponse {}

export interface ListCommentsResponse {
  comments: Comment[];
}

export type DeleteCommentResponse = {};
export type CountCommentsRequest = { opportunityId: string };
export type CountCommentResponse = { count: number };

// Like APIs

export interface ListLikesResponse {
  likes: Number;
}

// User APIs
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'password'>;
export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string; // username or email
  password: string;
}

export type SignInResponse = {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>;
  jwt: string;
};

export type GetUserRequest = {};
export type GetUserResponse = Pick<User, 'id' | 'firstName' | 'lastName' | 'userName'>;

export type GetUserByEmailRequest = { emailId: string };
export interface GetUserByEmailResponse {
  user: User;
}
export type GetUserByUserNameRequest = {
  username: string;
};
export interface GetUserByUserNameResponse {
  user: User;
}

export type GetCurrentUserRequest = {};
export type GetCurrentUserResponse = Pick<User, 'id' | 'firstName' | 'lastName' | 'userName' | 'email'>;
