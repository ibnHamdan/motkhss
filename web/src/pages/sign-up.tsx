import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, signUp } from '../fetch/auth';
import { ROUTES } from '../routes';
import { ApiError, callEndpoint } from '../fetch';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { RequiredInput } from '../components/required-input';
import { useDocumentTitle } from '../doc-title';
import { useCurrentUser } from '../components/userContext';
import { ENDPOINT_CONFIGS, TrackRequest } from '@motkhss/shared';

export const SignUp = () => {
  useDocumentTitle('sign up');
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [un, setUn] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { refreshCurrentUser } = useCurrentUser();

  const signup = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      try {
        await signUp(fname, lname, email, pw, un);
        callEndpoint<TrackRequest, unknown>(ENDPOINT_CONFIGS.track, {
          eventName: `SignUP${un}`,
          payload: { fname, lname, email },
        });
        refreshCurrentUser();
        navigate(ROUTES.HOME);
      } catch (e) {
        setError((e as ApiError).message);
      }
    },
    [fname, lname, email, pw, un, navigate, refreshCurrentUser]
  );

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  return (
    <form onSubmit={signup}>
      <Flex maxW={'sm'} mx={'auto'} my={10} direction={'column'} gap={4}>
        <RequiredInput placeholder="Username" value={un} variant={'filled'} onChange={(e) => setUn(e.target.value)} />
        <RequiredInput
          placeholder="Password"
          value={pw}
          variant={'filled'}
          type="password"
          onChange={(e) => setPw(e.target.value)}
        />
        <RequiredInput
          placeholder="email"
          value={email}
          variant={'filled'}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <RequiredInput
          placeholder="First name"
          value={fname}
          variant={'filled'}
          onChange={(e) => setFname(e.target.value)}
        />
        <RequiredInput
          placeholder="Last Name"
          value={lname}
          variant={'filled'}
          onChange={(e) => setLname(e.target.value)}
        />

        <Box m="auto">
          <Button type="submit" display="block" onClick={signup}>
            Sign up
          </Button>

          {!!error && <Text color={'red.700'}>{error}</Text>}
        </Box>
      </Flex>
    </form>
  );
};
