import {
  CreateCommentRequest,
  CreateCommentResponse,
  ENDPOINT_CONFIGS,
  GetOpportunityRequest,
  GetOpportunityResponse,
  ListCommentsResponse,
} from '@motkhss/shared';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { callEndpoint } from '../fetch';
import { useCallback, useState } from 'react';
import { Box, Button, Flex, Skeleton, SkeletonText, Text, Textarea } from '@chakra-ui/react';
import { OpportunityCard } from '../components/opportunity-card';
import { useDocumentTitle } from '../doc-title';

export const ViewOpportunity = () => {
  const { id: opportunityId } = useParams();
  const { url, method } = ENDPOINT_CONFIGS.getOpportunity;

  const { data, error, isLoading } = useQuery(['viewOpportunity'], () =>
    callEndpoint<GetOpportunityRequest, GetOpportunityResponse>(url.replace(':id', opportunityId!), method, {
      opportunityId: opportunityId,
    })
  );

  const { url: commentsUrl, method: commentsMethod } = ENDPOINT_CONFIGS.listComments;
  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsLoading,
    refetch,
  } = useQuery(['listComments'], () =>
    callEndpoint<{}, ListCommentsResponse>(commentsUrl.replace(':opportunityId', opportunityId!), commentsMethod, {})
  );

  const [comment, setComment] = useState('');
  const submitComment = useCallback(async () => {
    const { method, url } = ENDPOINT_CONFIGS.createComment;
    await callEndpoint<CreateCommentRequest, CreateCommentResponse>(
      url.replace(':opportunityId', opportunityId!),
      method,
      { comment }
    );
    setComment('');
    refetch();
  }, [comment, opportunityId, refetch]);

  const opportunityName = isLoading ? 'Loading ...' : error || !data ? 'Error' : data.opportunity.title;
  useDocumentTitle(opportunityName);

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  if (error || !data?.opportunity) {
    return <div>error loading opportunity: {JSON.stringify(error)}</div>;
  }

  return (
    <Box>
      <OpportunityCard opportunity={data.opportunity} hideDiscuss />

      <Box w={'xl'}>
        <hr />
      </Box>

      <form onSubmit={submitComment}>
        <Flex direction="column" gap={4} mt={4}>
          {commentsError ? <Text color="red.700">Error loading comments </Text> : null}

          {commentsLoading ? <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" /> : null}

          {commentsData?.comments?.map((comment, i) => (
            <Box key={i}>{comment.comment}</Box>
          ))}

          {!commentsData?.comments.length && (
            <Text color={'GrayText'} fontStyle={'italic'}>
              No comments yet. Add the first comment bellow
            </Text>
          )}

          <Box w="xl">
            <hr />
          </Box>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} maxW={'xl'} />
          <Box>
            <Button onClick={submitComment}>Add comment</Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};
