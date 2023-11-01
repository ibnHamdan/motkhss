export type EndpointConfig = {
  url: string;
  method: 'get' | 'post' | 'delete';
  auth?: boolean;
};

export enum Endpoints {
  healthz = 'healthz',

  signin = 'signin',
  signup = 'signup',
  getUser = 'getUser',
  getCurrentUser = 'getCurrentUser',

  listOpportunities = 'listOpportunities',
  getOpportunity = 'getOpportunity',
  createOpportunity = 'createOpportunity',
  deleteOpportunity = 'deleteOpportunity',

  listLikes = 'listLikes',
  createLike = 'createLike',

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
  },
  [Endpoints.signup]: {
    url: '/api/v1/signup',
    method: 'post',
    auth: false,
  },
  [Endpoints.getUser]: { url: '/api/v1/users/:id', method: 'get' },
  [Endpoints.getCurrentUser]: { url: '/api/v1/users', method: 'get', auth: true },

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
    url: '/api/v1/likes/:opoortunityId',
    method: 'post',
    auth: true,
  },

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
