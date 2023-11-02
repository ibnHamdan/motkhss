import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../fetch/auth';
import { ROUTES } from '../routes';
import { CreateOpportunityRequest, CreateOpportunityResponse, ENDPOINT_CONFIGS } from '@motkhss/shared';
import { ApiError, callEndpoint } from '../fetch';
import { Box, Button, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { RequiredInput } from '../components/required-input';
import { useDocumentTitle } from '../doc-title';

export const NewOpprtunity = () => {
  useDocumentTitle('New Opportunity');
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  const submitOpportunity = useCallback(
    async (e: FormEvent | MouseEvent) => {
      e.preventDefault();
      try {
        const { method, url: apiUrl } = ENDPOINT_CONFIGS.createOpportunity;
        await callEndpoint<CreateOpportunityRequest, CreateOpportunityResponse>(apiUrl, method, { title, url });
        navigate(ROUTES.HOME);
      } catch (e) {
        setError((e as ApiError).message);
      }
    },
    [navigate, title, url]
  );

  return (
    <form onSubmit={submitOpportunity}>
      <Flex color={'gray.700'} maxW={'lg'} mx="auto" my={10} direction={'column'} gap={4}>
        <FormControl isRequired>
          <FormLabel>Add a title</FormLabel>
          <RequiredInput
            placeholder="Titel"
            value={title}
            variant={'filled'}
            onChange={(e) => setTitle(e.target.value)}
            style={{ unicodeBidi: 'plaintext' }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Add the opportunity URL</FormLabel>
          <RequiredInput
            placeholder="URL"
            value={url}
            variant={'filled'}
            onChange={(e) => setUrl(e.target.value)}
            style={{ unicodeBidi: 'plaintext' }}
          />
        </FormControl>

        <Box m={'auto'}>
          <Button type="submit" display={'block'} onClick={submitOpportunity}>
            Create Opportunity
          </Button>
        </Box>
        {!!error && <Text color={'red.700'}>{error}</Text>}
      </Flex>
    </form>
  );
};
