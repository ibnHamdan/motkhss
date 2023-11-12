import { Button, Flex, HStack, Switch, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { isLoggedIn, signOut } from '../fetch/auth';
import { useCallback, useEffect, useState } from 'react';
import { useCurrentUser } from './userContext';

export const NavBar = () => {
  const navigate = useNavigate();
  const { currentUser, refreshCurrentUser } = useCurrentUser();
  const onSignout = useCallback(() => {
    signOut();
    refreshCurrentUser();
    navigate(ROUTES.HOME);
  }, [navigate, refreshCurrentUser]);
  const [lang, setLang] = useState('rtl');

  useEffect(() => {
    document.documentElement.dir = lang;
  }, [lang]);

  return (
    <Flex py={4} px={10} align={'center'} justify={'space-between'} h={16}>
      <Link to={ROUTES.HOME}>
        <Text>MOTKHSS | المتخصص</Text>
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
                  {currentUser.firstName}
                  {currentUser.lastName}
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
        <HStack>
          <Text>عربي</Text>
          <Switch onChange={(e) => setLang(e.target.checked ? 'en' : 'rtl')} />
          <Text>EN</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
