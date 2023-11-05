import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListOpportunities } from './pages/list-opprtunities';
import { ViewOpportunity } from './pages/view-opportunity';
import { NavBar } from './components/nav-bar';
import { ROUTES } from './routes';
import { SignIn } from './pages/sign-in';
import { SignUp } from './pages/sign-up';
import { NewOpprtunity } from './pages/new-opportunity';
import { UserProfile } from './pages/user-profile';
import { isDev } from './util';
import { Box } from '@chakra-ui/react';

export const App = () => {
  return (
    <>
      <Box h={'100vh'}>
        <BrowserRouter>
          <NavBar />
          <Box m={4}>
            <Routes>
              <Route path={ROUTES.HOME} element={<ListOpportunities />} />
              <Route path={ROUTES.VIEW_OPPORTUNITY(':id')} element={<ViewOpportunity />} />
              <Route path={ROUTES.NEW_OPPORTUNITY} element={<NewOpprtunity />} />
              <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route path={ROUTES.USER_PORFIEL(':id')} element={<UserProfile />} />
            </Routes>
          </Box>
          {/* Opportunities: {!!data?.opportunities && <div>{JSON.stringify(data.opportunities)}</div>} */}
        </BrowserRouter>
        {isDev && (
          <Box m={4} position={'absolute'} bottom={0} right={0} textTransform={'uppercase'} fontSize={'xs'}>
            development version
          </Box>
        )}
      </Box>
    </>
  );
};
