import { tr } from 'date-fns/locale';

export type EndpointConfig = {
  url: string;
  method: 'get' | 'post' | 'delete' | 'patch';
  auth?: boolean;
  sensitive?: boolean;
};

export enum Endpoints {
  healthz = 'healthz',

  signin = 'signin',
  signup = 'signup',
  getUser = 'getUser',
  getCurrentUser = 'getCurrentUser',
  updateCurrentUser = 'updateCurrentUser',

  listOpportunities = 'listOpportunities',
  getOpportunity = 'getOpportunity',
  createOpportunity = 'createOpportunity',
  deleteOpportunity = 'deleteOpportunity',

  listLikes = 'listLikes',
  createLike = 'createLike',
  deleteLike = 'deleteLike',

  listComments = 'listComments',
  createComment = 'createComment',
  deleteComment = 'deleteComment',
  countComments = 'countComments',
}

export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  [Endpoints.healthz]: {
    url: '/healthz',
    method: 'get',
  },

  [Endpoints.signin]: {
    url: '/api/v1/signin',
    method: 'post',
    auth: false,
    sensitive: true,
  },
  [Endpoints.signup]: {
    url: '/api/v1/signup',
    method: 'post',
    auth: false,
    sensitive: true,
  },
  [Endpoints.getUser]: { url: '/api/v1/users/:id', method: 'get' },
  [Endpoints.getCurrentUser]: { url: '/api/v1/users', method: 'get', auth: true },
  [Endpoints.updateCurrentUser]: { url: '/api/v1/users', method: 'patch', auth: true },

  [Endpoints.listOpportunities]: {
    url: '/api/v1/opportunities',
    method: 'get',
    auth: false,
  },
  [Endpoints.getOpportunity]: {
    url: '/api/v1/opportunities/:id',
    method: 'get',
  },
  [Endpoints.createOpportunity]: {
    url: '/api/v1/opportunities',
    method: 'post',
    auth: true,
  },
  [Endpoints.deleteOpportunity]: {
    url: '/api/v1/opportunities/:id',
    method: 'post',
    auth: true,
  },

  [Endpoints.listLikes]: {
    url: '/api/v1/likes/:opportunityId',
    method: 'get',
  },
  [Endpoints.createLike]: {
    url: '/api/v1/likes/:opportunityId',
    method: 'post',
    auth: true,
  },
  [Endpoints.deleteLike]: { method: 'delete', url: '/api/v1/likes/:opportunityId', auth: true },

  [Endpoints.listComments]: {
    url: '/api/v1/comments/:opportunityId',
    method: 'get',
  },
  [Endpoints.createComment]: {
    url: '/api/v1/comments/:opportunityId',
    method: 'post',
    auth: true,
  },
  [Endpoints.deleteComment]: {
    url: '/api/v1/comments/:opprtunityId',
    method: 'post',
    auth: true,
  },
  [Endpoints.countComments]: {
    url: '/api/v1/comments/:opportunityId/count',
    method: 'get',
  },
};

export function withParams(endpoint: EndpointConfig, ...params: string[]): EndpointConfig {
  let url = endpoint.url;
  const placeholders = url.match(/:[^\/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${placeholders.length < params.length} ? 'many': 'few'} params for url: ${url}`;
  }

  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index], params[index]);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
}
