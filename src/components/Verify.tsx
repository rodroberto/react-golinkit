import { Flex, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react';

import PageHeader from './PageHeader';

interface VerifyProps {
  email: string;
}

const Verify = ({ email }: VerifyProps) => {
  return (
    <>
      <PageHeader title='Verify' description='OTP Code Sent' />
      <Text textAlign='center' marginTop='20px'>
        Enter the 4 digits code that you received on your email {email}
      </Text>
      <HStack justifyContent='center' marginY='40px'>
        <PinInput placeholder='' size='lg'>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Text textAlign='center' marginY='20px'>Didn't you receive any code?</Text>
      <Text textAlign='center' cursor='pointer' color='purple'>Resend</Text>
    </>
  );
};

export default Verify;
