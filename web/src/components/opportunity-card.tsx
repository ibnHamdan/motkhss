import { Box, Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import {
  CountCommentResponse,
  CountCommentsRequest,
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Opportunity,
  withParams,
} from '@motkhss/shared';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { callEndpoint } from '../fetch';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import React, { useCallback } from 'react';
import { formatDistance } from 'date-fns';
import { isLoggedIn } from '../fetch/auth';
import { ROUTES } from '../routes';

export const OpportunityCard: React.FC<{
  opportunity: Opportunity;
  refetch: () => unknown;
  hideDiscuss?: boolean;
}> = ({ opportunity, refetch, hideDiscuss }) => {
  const { id, url: opportunityUrl, title, userId, liked } = opportunity;
  const { user, error, isLoading } = useGetUser(userId);
  const { countCommentsRes } = useCountComments(id);

  const toast = useToast();

  const urlWithProtocol = opportunityUrl.startsWith('http') ? opportunityUrl : 'http://' + opportunityUrl;
  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.userName;
  const commentsCount = countCommentsRes?.count ?? '0';

  const toggleLike = useCallback(
    async (opportunityId: string, like: boolean) => {
      const endpoint = like ? ENDPOINT_CONFIGS.createLike : ENDPOINT_CONFIGS.deleteLike;
      try {
        await callEndpoint<{}, {}>(withParams(endpoint, opportunityId));
      } catch (e) {
        console.log(e);
        return toast({
          position: 'top',
          render: () => (
            <Box color="white" p={3} bg="red.500">
              Error
            </Box>
          ),
        });
      }
      refetch();
    },
    [refetch, toast]
  );

  return (
    <Flex m={4} gap={2} align="baseline">
      {isLoggedIn() && (
        <Box position="relative" w={4} onClick={() => toggleLike(id, !liked)}>
          <Icon
            position="absolute"
            top="-0.8rem"
            as={liked ? BsHeartFill : BsHeart}
            fill="gray"
            cursor="pointer"
            _hover={{ fill: 'brown' }}
          />
        </Box>
      )}

      <Box>
        <Flex align="center">
          <a href={`/o/${id}`} target="_blank" rel="noreferrer">
            <Text color="gray.600" fontWeight="bold" pr={2} style={{ unicodeBidi: 'plaintext' }}>
              {title}
            </Text>
          </a>

          <a href={urlWithProtocol} target="_blank" rel="noreferrer">
            <Text fontSize="sm" color="gray.400">
              ({getUrlDomain(urlWithProtocol)})
            </Text>
          </a>

          {!hideDiscuss && (
            <Link to={`/o/${id}`}>
              <Button
                ml={2}
                variant="outline"
                borderColor="gray.300"
                borderRadius={4}
                p={2}
                size="xs"
                color={commentsCount ? undefined : 'gray'}
              >
                {commentsCount ? `${commentsCount} comment${commentsCount === 1 ? '' : 's'}` : 'discuss'}
              </Button>
            </Link>
          )}
        </Flex>

        <Flex gap={1} fontSize={'sm'} color={'gray.500'}>
          <Text>By:</Text>
          <Link to={user ? ROUTES.USER_PORFIEL(user.id) : '#'}>
            <Text fontWeight="bold">{userName}</Text>
          </Link>
          <Text>
            {' '}
            -{' '}
            {formatDistance(opportunity.postedAt, Date.now(), {
              addSuffix: true,
            })}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const getUrlDomain = (url: string): string => {
  try {
    const short = new URL(url).host;
    return short.startsWith('wwww') ? short.substring(4) : short;
  } catch {
    return url;
  }
};

const useGetUser = (userId: string) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery([`getUser${userId}`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(withParams(ENDPOINT_CONFIGS.getUser, userId))
  );
  return { user, error, isLoading };
};

const useCountComments = (opportunityId: string) => {
  const { data: countCommentsRes } = useQuery([`countComments${opportunityId}`], () =>
    callEndpoint<CountCommentsRequest, CountCommentResponse>(withParams(ENDPOINT_CONFIGS.countComments, opportunityId))
  );
  return { countCommentsRes };
};
