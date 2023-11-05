import {
  CreateCommentRequest,
  CreateCommentResponse,
  ENDPOINT_CONFIGS,
  GetOpportunityRequest,
  GetOpportunityResponse,
  ListCommentsResponse,
  withParams,
} from '@motkhss/shared';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { callEndpoint } from '../fetch';
import { useCallback, useState } from 'react';
import { Box, Button, Flex, SkeletonText, Text, Textarea } from '@chakra-ui/react';
import { OpportunityCard } from '../components/opportunity-card';
import { useDocumentTitle } from '../doc-title';
import { isLoggedIn } from '../fetch/auth';
import { CommentCard } from '../components/comment-card';

export const ViewOpportunity = () => {
  const { id: opportunityId } = useParams();

  const {
    data,
    error,
    isLoading,
    refetch: refetchOpportunity,
  } = useQuery(['viewOpportunity'], () =>
    callEndpoint<GetOpportunityRequest, GetOpportunityResponse>(
      withParams(ENDPOINT_CONFIGS.getOpportunity, opportunityId!)
    )
  );

  const {
    data: commentsData,
    error: commentsError,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery(['listComments'], () =>
    callEndpoint<{}, ListCommentsResponse>(withParams(ENDPOINT_CONFIGS.listComments, opportunityId!))
  );

  const [comment, setComment] = useState('');
  const submitComment = useCallback(async () => {
    await callEndpoint<CreateCommentRequest, CreateCommentResponse>(
      withParams(ENDPOINT_CONFIGS.createComment, opportunityId!),
      { comment }
    );
    setComment('');
    refetchComments();
  }, [comment, opportunityId, refetchComments]);

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
      <OpportunityCard opportunity={data.opportunity} refetch={refetchOpportunity} hideDiscuss />

      <Box w={'xl'}>
        <hr />
      </Box>

      <form onSubmit={submitComment}>
        <Flex direction="column" gap={4} mt={4} ml={4}>
          {commentsError ? <Text color="red.700">Error loading comments </Text> : null}
          {commentsLoading ? <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" /> : null}
          {isLoggedIn() && (
            <>
              <Textarea
                placeholder="Type to add your own comment.."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxW="xl"
                style={{ unicodeBidi: 'plaintext' }}
              />
              <Box>
                <Button size="sm" onClick={submitComment} disabled={!comment.trim().length}>
                  Add comment
                </Button>
              </Box>

              <Box w="xl">
                <hr />
              </Box>
            </>
          )}
          {commentsData?.comments?.map((comment, i) => (
            <CommentCard key={i} comment={comment} />
          ))}
          {!commentsData?.comments.length && (
            <Text color={'GrayText'} fontStyle={'italic'}>
              No comments yet. Add the first comment bellow
            </Text>
          )}
        </Flex>
      </form>
    </Box>
  );
};
