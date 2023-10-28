import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { CountCommentResponse, CountCommentsRequest, ENDPOINT_CONFIGS, Opportunity } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { callEndpoint } from '../fetch';

export const OpportunityCard: React.FC<Opportunity> = (opportunity) => {
  const { method, url } = ENDPOINT_CONFIGS.countComments;
  const {
    data: commentsCount,
    isLoading,
    error,
  } = useQuery([`countComments${opportunity.id}`], () =>
    callEndpoint<CountCommentsRequest, CountCommentResponse>(url.replace(':opportunityId', opportunity.id), method, {
      opportunityId: opportunity.id,
    })
  );

  const count = isLoading ? '...' : error ? 'unknown' : commentsCount?.count ?? '0';
  return (
    <Box>
      <Flex gap={3}>
        <Text fontSize="md" fontWeight={'bold'} color={'cyan.600'}>
          {opportunity.title}
        </Text>
        <Text fontWeight={'bold'} color={'gray.700'}>
          {opportunity.url}
        </Text>
        <Link to={`/opportunity/${opportunity.id}`}>
          <Button variant={'outline'} size={'sm'}>
            {count} Comment
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
