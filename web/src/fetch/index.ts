import { QueryClient } from '@tanstack/react-query';
import { isDev } from '../util';
import { ERRORS, EndpointConfig } from '@motkhss/shared';
import { getLocalStorageJWT, isLoggedIn, signOut } from './auth';

const API_HOST = isDev ? `http://localhost:${window.location.port}` : 'https://motkhss.com';

export class ApiError extends Error {
  public status: number;

  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      retry(failureCount, error) {
        const { status } = error as ApiError;
        if (typeof status !== 'number') {
          console.error('got non-numeric error code:', error);
          return true;
        }
        return status >= 500 && failureCount < 2;
      },
    },
  },
});

export async function callEndpoint<Request, Response>(endpoint: EndpointConfig, request?: Request): Promise<Response> {
  const { url, method, auth } = endpoint;
  const requestBody = request ? JSON.stringify(request) : undefined;

  const respone = await fetch(`${API_HOST}${url}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      /// We include an Authorization header when it's explicitly required or
      // when the user is logged in.
      ...((auth || isLoggedIn()) && { Authorization: `Bearer ${getLocalStorageJWT()}` }),
    },
    body: requestBody,
  });
  //console.log('callEndpoint', url, respone, respone.headers.get('content-type'));
  if (!respone.ok) {
    let msg = '';
    try {
      msg = (await respone.json()).error;
      if (msg === ERRORS.TOKEN_EXPIRED) {
        signOut();
        window.location.reload();
      }
    } finally {
      throw new ApiError(respone.status, msg);
    }
  }

  const isJson = respone.headers.get('content-type')?.includes('application/json');
  return isJson ? ((await respone.json()) as Response) : ({} as Response);
}
