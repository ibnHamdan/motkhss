export enum ERRORS {
  TOKEN_EXPIRED = 'Token expired',
  BAD_TOKEN = 'Bad token',

  USER_NOT_FOUND = 'User not found',
  USER_REQUIRED_FIELDS = 'Email, username, and password are required',
  DUPLICATE_EMAIL = 'An account with this email already exists',
  DUPLICATE_USERNAME = 'An account with this username already exists',

  OPPORTUNITY_ID_MISSING = 'Opportunity ID is missing',
  OPPORTUNITY_NOT_FOUND = 'Opportunity not found',
  DUPLICATE_URL = 'A opportunity with this URL already Exists',

  COMMENT_MISSING = 'Comment is missing',
  COMMENT_ID_MISSING = 'Comment ID is missing',

  DUPLICATE_LIKE = 'Duplicate like',
}
