import { Button, Flex, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { isLoggedIn, signOut } from '../fetch/auth';
import { useCallback } from 'react';
import { ENDPOINT_CONFIGS, GetCurrentUserRequest, GetCurrentUserResponse } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';

export const NavBar = () => {
  const navigate = useNavigate();
  const onSignout = useCallback(() => {
    signOut();
    navigate(ROUTES.HOME);
  }, [navigate]);

  const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;
  const { data: currentUser } = useQuery(
    ['getCurrentUser'],
    () => callEndpoint<GetCurrentUserRequest, GetCurrentUserResponse>(url, method, {}),
    {
      enabled: isLoggedIn(),
    }
  );

  return (
    <Flex py={4} px={10} align={'center'} justify={'space-between'} h={16}>
      <Link to={ROUTES.HOME}>
        <Text>MOTKHSS</Text>
      </Link>

      <Flex gap={5} align={'center'}>
        {isLoggedIn() ? (
          <>
            <Link to={ROUTES.NEW_OPPORTUNITY}>
              <Button variant={'solid'} size={'sm'}>
                Add Opportunity
              </Button>
            </Link>
            {currentUser && (
              <Link to={ROUTES.USER_PORFIEL(currentUser.id)}>
                <Text fontSize={'sm'} color={'gray.600'}>
                  {currentUser.userName}
                </Text>
              </Link>
            )}

            <Button size={'sm'} variant={'ghost'} onClick={onSignout}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link to={ROUTES.SIGN_IN}>
              <Button variant={'ghost'} size={'sm'}>
                Sign in
              </Button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <Button variant={'solid'} size={'sm'}>
                Sign up
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};
