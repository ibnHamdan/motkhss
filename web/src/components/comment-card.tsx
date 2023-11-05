import { Comment, ENDPOINT_CONFIGS, GetUserRequest, GetUserResponse, withParams } from '@motkhss/shared';
import React from 'react';
import { useQuery } from 'react-query';
import { callEndpoint } from '../fetch';
import { Box, Flex, Icon, SkeletonText, Text } from '@chakra-ui/react';
import { BsHeart } from 'react-icons/bs';
import { formatDistance } from 'date-fns';
import { LinkItUrl } from 'react-linkify-it';
import { isLoggedIn } from '../fetch/auth';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export const CommentCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { comment: commentText, postedAt, userId } = comment;

  const {
    data: user,
    error,
    isLoading,
  } = useQuery([`getuser${userId}`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(withParams(ENDPOINT_CONFIGS.getUser, userId))
  );

  const userName =
    isLoading || !user ? <SkeletonText noOfLines={1} w={'20px'}></SkeletonText> : error ? '<unknown>' : user.userName;
  return (
    <Box fontSize={'sm'} color={'GrayText'}>
      <Flex gap={1} align={'baseline'}>
        {isLoggedIn() && (
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
        )}
        <Text fontSize="xs">By: </Text>
        <Link to={ROUTES.USER_PORFIEL(user?.id ?? '#')}>
          <Text fontSize={'xs'} fontWeight="bold">
            {userName}
          </Text>
        </Link>
        <Text fontSize={'xs'}>{formatDistance(postedAt, Date.now(), { addSuffix: true })}</Text>
      </Flex>

      <Box whiteSpace={'pre-line'} borderLeft={'1px solid #ddd'} pl={2} ml={'7px'} fontSize={'sm'}>
        <LinkItUrl>
          <Text color="InfoText" style={{ unicodeBidi: 'plaintext' }}>
            {commentText}
          </Text>
        </LinkItUrl>
      </Box>
    </Box>
  );
};
