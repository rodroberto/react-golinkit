import { Box, Flex, FormControl, Text } from '@chakra-ui/react';
import TextInput from './common/TextInput';
import ProfileInfo from './ProfileInfo';

interface ChangeLinkProps {
  username: string;
  profileLink: string;
  onChangeProfileLink: (profileLink: string) => void;
  profileImage: string;
  backgroundImage: string;
  bio: string;
}

const ChangeLink = ({
  profileLink,
  username,
  onChangeProfileLink,
  profileImage,
  backgroundImage,
  bio,
}: ChangeLinkProps) => {
  return (
    <Flex flexDirection='column' gap={4}>
      <FormControl>
        <Text marginBottom='8px'>Change Public link</Text>
        <TextInput
          isReadOnly
          value={`${process.env.REACT_APP_WEP_URL}/${profileLink}`}
        />
      </FormControl>
      <FormControl>
        <Text marginBottom='8px'>Change User Text input</Text>
        <TextInput value={profileLink} onChange={onChangeProfileLink} />
      </FormControl>
      <Box borderRadius='8px' border='1px solid #e2e8f0' padding='12px'>
        <Text marginBottom='8px'>Preview Link</Text>
        <ProfileInfo
          username={username}
          profileImage={profileImage}
          backgroundImage={backgroundImage}
          bio={bio}
        />
      </Box>
    </Flex>
  );
};

export default ChangeLink;
