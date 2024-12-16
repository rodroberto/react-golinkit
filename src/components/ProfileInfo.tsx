import { Flex, Image, Text } from '@chakra-ui/react';

interface ProfileInfoProps {
  email: string;
  profileImage: string;
  backgroundImage: string;
}

const ProfileInfo = ({
  email,
  profileImage,
  backgroundImage,
}: ProfileInfoProps) => {
  return (
    <Flex flexDirection='column'>
      <Flex justifyContent='center'>
        <Image
          src={`${process.env.REACT_APP_BASE_URL}/profiles/${profileImage}`}
          alt='Logo'
          width='100%'
        />
      </Flex>
      <Flex justifyContent='center'>
        <Image
          borderRadius='full'
          marginTop='-65px'
          boxSize='130px'
          src={`${process.env.REACT_APP_BASE_URL}/backgrounds/${backgroundImage}`}
          alt='Dan Abramov'
        />
      </Flex>
      <Text textAlign='center' marginY='16px'>
        {email}
      </Text>
      <Text textAlign='center'>description</Text>
    </Flex>
  );
};

export default ProfileInfo;
