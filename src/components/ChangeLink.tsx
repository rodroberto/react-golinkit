import { Box, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import TextInput from './common/TextInput';
import ProfileInfo from './ProfileInfo';

const ChangeLink = () => {
  return (
    <Flex flexDirection='column' gap={4}>
      <FormControl>
        <FormLabel>Change Public link</FormLabel>
        <TextInput />
      </FormControl>
      <FormControl>
        <FormLabel>Change User Text input</FormLabel>
        <TextInput />
      </FormControl>
      <Box borderRadius='8px' border='1px solid gray' padding='12px'>
        <FormLabel>Preview Link</FormLabel>
        <ProfileInfo />
      </Box>
    </Flex>
  );
};

export default ChangeLink;
