import { QueryClient } from 'react-query';

const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://motkhss.com';

export const LOCAL_STORAGE_JWT = 'jwtToken';
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

export async function callEndpoint<Request, Response>(
  url: string,
  method: 'get' | 'post' | 'delete',
  request: Request
): Promise<Response> {
  const respone = await fetch(`${HOST}${url}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_JWT)}`,
      'Content-Type': 'application/json',
    },
    body: method === 'get' ? undefined : JSON.stringify(request),
  });
  console.log('callEndpoint', url, respone, respone.headers.get('content-type'));
  if (!respone.ok) {
    let msg = '';
    try {
      msg = (await respone.json()).error;
    } finally {
      throw new ApiError(respone.status, msg);
    }
  }

  const isJson = respone.headers.get('content-type')?.includes('application/json');
  return isJson ? ((await respone.json()) as Response) : ({} as Response);
}
