import { ENDPOINT_CONFIGS, ListOpportunitiesRequest, ListOpportunitiesResponse } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';
import { OpportunityCard } from '../components/opportunity-card';
import { useDocumentTitle } from '../doc-title';

export const ListOpportunities = () => {
  useDocumentTitle('MOTKHSS | المتخصص');

  const { data, error, isLoading, refetch } = useQuery(['listOpportunities'], () =>
    callEndpoint<ListOpportunitiesRequest, ListOpportunitiesResponse>(ENDPOINT_CONFIGS.listOpportunities)
  );

  if (isLoading) {
    return <div>loading ...</div>;
  }

  if (error) {
    return <div>error loading opportunities</div>;
  }

  return (
    <>
      {data?.opportunities.map((opportunity, i) => (
        <OpportunityCard key={i} opportunity={opportunity} refetch={refetch} />
      ))}
    </>
  );
};
