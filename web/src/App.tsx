import { ListOpportunitiesResponse } from '@motkhss/shared';
import { listOpportunities } from './client';
import { useQuery } from 'react-query';

export const App = () => {
  // const [opportunities, setOpportunities] = useState<Opportunity[]>();

  // useEffect(() => {
  //   fetch(`${HOST}/api/v1/opportunities`)
  //     .then((res) => res.json())
  //     .then((res) => setOpportunities(res.opportunities));
  // }, []);

  const { data, error, isLoading } = useQuery<ListOpportunitiesResponse>(['listOpportunities'], listOpportunities);

  if (isLoading) {
    return <div>loading .....</div>;
  }

  if (error) {
    return <div>error loading opportunities</div>;
  }

  return (
    <>
      Opportunities:
      {!!data?.opportunities && <div>{JSON.stringify(data.opportunities)}</div>}
    </>
  );
};
