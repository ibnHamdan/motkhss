import { ENDPOINT_CONFIGS, GetUserRequest, GetUserResponse } from '@motkhss/shared';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { callEndpoint } from '../fetch';
import { Box, Flex, SkeletonText, Text } from '@chakra-ui/react';

export const UserProfile = () => {
  const { id } = useParams();
  const { url, method } = ENDPOINT_CONFIGS.getUser;
  const {
    data: user,
    error,
    isLoading,
  } = useQuery([`getuser${id}`], () =>
    callEndpoint<GetUserRequest, GetUserResponse>(url.replace(':id', id!), method, {})
  );

  if (isLoading) {
    return <SkeletonText noOfLines={3}></SkeletonText>;
  }

  if (error || !user) {
    return <div>error loading user : {JSON.stringify(error)}</div>;
  }

  return (
    <Box maxW="sm">
      <Flex>
        <Text w={16} color={'GrayText'}>
          User:
        </Text>
        <Text>{user.userName}</Text>
      </Flex>
      <Flex>
        <Text w={16} color={'GrayText'}>
          Name:
        </Text>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
      </Flex>
    </Box>
  );
};
