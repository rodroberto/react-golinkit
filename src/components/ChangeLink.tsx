import { Box, Flex, FormControl, Text } from '@chakra-ui/react';
import TextInput from './common/TextInput';
import ProfileInfo from './ProfileInfo';

interface ChangeLinkProps {
  email: string;
  profileLink: string;
  onChangeProfileLink: (profileLink: string) => void;
  profileImage: string;
  backgroundImage: string;
}

const ChangeLink = ({
  profileLink,
  email,
  onChangeProfileLink,
  profileImage,
  backgroundImage,
}: ChangeLinkProps) => {
  return (
    <Flex flexDirection='column' gap={4}>
      <FormControl>
        <Text marginBottom='8px'>Change Public link</Text>
        <TextInput
          isReadOnly
          value={`${process.env.REACT_APP_WEP_URL}/profiles/${profileLink}`}
        />
      </FormControl>
      <FormControl>
        <Text marginBottom='8px'>Change User Text input</Text>
        <TextInput value={profileLink} onChange={onChangeProfileLink} />
      </FormControl>
      <Box borderRadius='8px' border='1px solid #e2e8f0' padding='12px'>
        <Text marginBottom='8px'>Preview Link</Text>
        <ProfileInfo
          email={email}
          profileImage={profileImage}
          backgroundImage={backgroundImage}
        />
      </Box>
    </Flex>
  );
};

export default ChangeLink;
