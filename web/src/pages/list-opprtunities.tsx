import { ENDPOINT_CONFIGS, ListOpportunitiesRequest, ListOpportunitiesResponse } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';

export const ListOpportunities = () => {
  const { url, method } = ENDPOINT_CONFIGS.listOpportunities;
  const { data, error, isLoading } = useQuery(['listOpportunities'], () =>
    callEndpoint<ListOpportunitiesRequest, ListOpportunitiesResponse>(url, method, {})
  );

  if (isLoading) {
    return <div>loading ...</div>;
  }

  if (error) {
    return <div>error loading opportunities</div>;
  }

  return (
    <div>
      Opportunities:
      {!!data?.opportunities && <div>{JSON.stringify(data.opportunities)}</div>}
    </div>
  );
};
