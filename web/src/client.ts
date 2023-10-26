import { ListOpportunitiesRequest, ListOpportunitiesResponse } from '@motkhss/shared';

const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://motkhss.com';

export const listOpportunities = async (req: ListOpportunitiesRequest): Promise<ListOpportunitiesResponse> => {
  const response = await fetch(`${HOST}/api/v1/opportunities`);

  if (!response.ok) {
    const { error } = await response.json();
    throw error;
  }

  return response.json();
};
