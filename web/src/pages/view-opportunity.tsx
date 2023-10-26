import { useParams } from 'react-router-dom';

export const ViewOpportunity = () => {
  const { id } = useParams();

  return <div>Viewng post {id}</div>;
};
