import { ENDPOINT_CONFIGS, ListOpportunitiesRequest, ListOpportunitiesResponse } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';
import { OpportunityCard } from '../components/opportunity-card';
import { Box } from '@chakra-ui/react';

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
    <Box>
      {data?.opportunities.map((opportunity, i) => (
        <OpportunityCard key={i} opportunity={opportunity} />
      ))}
    </Box>
  );
};
