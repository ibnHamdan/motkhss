import { Comment, ENDPOINT_CONFIGS, GetUserRequest, GetUserResponse } from '@motkhss/shared';
import React from 'react';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';
import { Box, Flex, Icon, SkeletonText, Text } from '@chakra-ui/react';
import { BsHeart } from 'react-icons/bs';
import { formatDistance } from 'date-fns';
import { LinkItUrl } from 'react-linkify-it';

export const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { comment: commentText, postedAt, userId } = comment;
  const { method: getUserMethod, url: getUserUrl } = ENDPOINT_CONFIGS.getUser;

  const {
    data: user,
    error,
    isLoading,
  } = useQuery([`getUser${userId}`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(getUserUrl.replace(':id', userId), getUserMethod, {
      id: userId,
    })
  );

  const userName =
    isLoading || !user ? <SkeletonText noOfLines={1} w={'20px'}></SkeletonText> : error ? '<unknown>' : user.userName;
  return (
    <Box fontSize={'sm'} color={'GrayText'}>
      <Flex gap={1} align={'baseline'}>
        <Box position={'relative'} w={4}>
          <Icon
            position={'absolute'}
            top={'-0.8rem'}
            as={BsHeart}
            fill={'gray'}
            cursor={'pointer'}
            _hover={{ fill: 'azure' }}
          />
        </Box>
        <Text fontSize="xs">By: </Text>
        <Text fontSize={'xs'} fontWeight="bold">
          {userName}
        </Text>
        <Text fontSize={'xs'}>{formatDistance(postedAt, Date.now(), { addSuffix: true })}</Text>
      </Flex>

      <Box whiteSpace={'pre-line'} borderLeft={'1px solid #ddd'} pl={2} ml={'7px'} fontSize={'sm'}>
        <LinkItUrl>
          <Text color="InfoText">{commentText}</Text>
        </LinkItUrl>
      </Box>
    </Box>
  );
};