import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListOpportunities } from './pages/list-opprtunities';
import { ViewOpportunity } from './pages/view-opportunity';
import { NavBar } from './components/nav-bar';
import { ROUTES } from './routes';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path={ROUTES.HOME} element={<ListOpportunities />} />
          <Route
            path={ROUTES.VIEW_OPPORTUNITY(':id')}
            element={<ViewOpportunity />}
          />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
        {/* Opportunities: {!!data?.opportunities && <div>{JSON.stringify(data.opportunities)}</div>} */}
      </BrowserRouter>
    </>
  );
};
