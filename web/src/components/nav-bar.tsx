import { Box, Button, Flex } from '@chakra-ui/react';

export const NavBar = () => {
  return (
    <Flex justify="space-between" m={4}>
      <Box>Logo</Box>
      <Flex gap={2}>
        <Button variant={'outline'}>Sign in</Button>
        <Button>Sign up</Button>
      </Flex>
    </Flex>
  );
};
