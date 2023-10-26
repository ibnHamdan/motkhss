import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListOpportunities } from './pages/list-opprtunities';
import { ViewOpportunity } from './pages/view-opportunity';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListOpportunities />} />
        <Route path="/o/:id" element={<ViewOpportunity />} />
      </Routes>
      {/* Opportunities: {!!data?.opportunities && <div>{JSON.stringify(data.opportunities)}</div>} */}
    </BrowserRouter>
  );
};
