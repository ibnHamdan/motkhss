import { ENDPOINT_CONFIGS, ListOpportunitiesRequest, ListOpportunitiesResponse } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';
import { OpportunityCard } from '../components/opportunity-card';

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
      {!!data?.opportunities && data.opportunities.map((o, i) => <OpportunityCard {...o} key={i} />)}
    </div>
  );
};
