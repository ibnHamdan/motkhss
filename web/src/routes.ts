export const ROUTES = {
  HOME: '/',
  VIEW_OPPORTUNITY: (oid: string) => `/o/${oid}`,
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  NEW_OPPORTUNITY: '/new',
  USER_PORFIEL: (uid: string) => `/u/${uid}`,
};
