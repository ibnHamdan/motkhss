import { useEffect, useState } from 'react';
import { Opportunity } from '../../shared';

export const App = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>();

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/opportunities')
      .then((res) => res.json())
      .then((res) => setOpportunities(res.opportunities));
  }, []);

  return (
    <>
      {(opportunities?.length || 0) > 0 ? <div>{JSON.stringify(opportunities)}</div> : <div>No opportunitite</div>}
      {(opportunities?.length || 0) > 0 ? (
        <div>
          {opportunities?.map((o) => {
            console.log(o);
            return <h1>{o.title}</h1>;
          })}
        </div>
      ) : (
        <div>No opportunitite</div>
      )}
    </>
  );
};
