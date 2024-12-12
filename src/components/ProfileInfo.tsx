import { Flex, Image, Text } from "@chakra-ui/react";

const ProfileInfo = () => {
  return (
    <Flex flexDirection='column'>
      <Flex justifyContent='center'>
        <Image src='/assets/profile-bg.png' alt='Logo' width='100%' />
      </Flex>
      <Flex justifyContent='center'>
        <Image
          borderRadius='full'
          marginTop='-65px'
          boxSize='130px'
          src='https://bit.ly/dan-abramov'
          alt='Dan Abramov'
        />
      </Flex>
      <Text textAlign='center' marginY='16px'>
        email
      </Text>
      <Text textAlign='center'>description</Text>
    </Flex>
  );
};

export default ProfileInfo;
