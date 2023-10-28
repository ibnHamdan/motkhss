import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListOpportunities } from './pages/list-opprtunities';
import { ViewOpportunity } from './pages/view-opportunity';
import { NavBar } from './components/nav-bar';

export const App = () => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListOpportunities />} />
          <Route path="/opportunity/:id" element={<ViewOpportunity />} />
        </Routes>
        {/* Opportunities: {!!data?.opportunities && <div>{JSON.stringify(data.opportunities)}</div>} */}
      </BrowserRouter>
    </>
  );
};
