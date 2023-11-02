import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import {
  CountCommentResponse,
  CountCommentsRequest,
  ENDPOINT_CONFIGS,
  GetUserRequest,
  GetUserResponse,
  Opportunity,
} from '@motkhss/shared';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { callEndpoint } from '../fetch';
import { BsHeart } from 'react-icons/bs';
import React from 'react';
import { formatDistance } from 'date-fns';
import { isLoggedIn } from '../fetch/auth';

export const OpportunityCard: React.FC<{
  opportunity: Opportunity;
  hideDiscuss?: boolean;
}> = ({ opportunity, hideDiscuss }) => {
  const { id, url: opportunityUrl, title, userId } = opportunity;
  const { method: userMethod, url: getUserUrl } = ENDPOINT_CONFIGS.getUser;
  const {
    data: user,
    error,
    isLoading,
  } = useQuery([`getUser${userId}`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(getUserUrl.replace(':id', userId), userMethod, { id: userId })
  );

  const { method, url } = ENDPOINT_CONFIGS.countComments;
  const { data: commentsCountRes } = useQuery([`countComments${id}`], () =>
    callEndpoint<CountCommentsRequest, CountCommentResponse>(url.replace(':opportunityId', id), method, {
      opportunityId: id,
    })
  );

  const urlWithProtocol = opportunityUrl.startsWith('http') ? opportunityUrl : 'http://' + opportunityUrl;
  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.userName;
  const commentsCount = commentsCountRes?.count ?? '0';

  return (
    <Flex m={4} gap={2} align="baseline">
      {isLoggedIn() && (
        <Box position="relative" w={4}>
          <Icon
            position="absolute"
            top="-0.8rem"
            as={BsHeart}
            fill="gray"
            cursor="pointer"
            _hover={{ fill: 'brown' }}
          />
        </Box>
      )}

      <Box>
        <Flex align="center">
          <a href={`/o/${id}`}>
            <Text color="gray.600" fontWeight="bold" pr={2}>
              {title}
            </Text>
          </a>

          <a href={urlWithProtocol}>
            <Text fontSize="sm" color="gray.400">
              ({getUrlDomain(urlWithProtocol)})
            </Text>
          </a>

          {!hideDiscuss && (
            <Link to={`/o/${id}`}>
              <Button ml={2} variant="outline" borderColor="gray.300" borderRadius={4} p={2} size="xs" color="gray">
                {commentsCount ? `${commentsCount} Comments` : 'Discuss'}
              </Button>
            </Link>
          )}
        </Flex>

        <Flex gap={1} fontSize={'sm'} color={'gray.500'}>
          <Text>By:</Text>
          <Text fontWeight="bold">{userName}</Text>
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
