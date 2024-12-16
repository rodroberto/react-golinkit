import { HStack, PinInput, PinInputField, Text } from '@chakra-ui/react';

import PageHeader from './PageHeader';

interface VerifyProps {
  email: string;
  onChange: (val: string) => void;
  onResend: () => void;
}

const Verify = ({ email, onChange, onResend }: VerifyProps) => {

  return (
    <>
      <PageHeader title='Verify' description='OTP Code Sent' />
      <Text textAlign='center' marginTop='20px'>
        Enter the 4 digits code that you received on your email <b>{email}</b>
      </Text>
      <HStack justifyContent='center' marginY='40px'>
        <PinInput placeholder='' size='lg' onChange={onChange}>
          <PinInputField backgroundColor='rgba(255, 121, 121, 0.1)' color="#CF00FF" fontWeight='500' />
          <PinInputField backgroundColor='rgba(255, 121, 121, 0.1)' color="#CF00FF" fontWeight='500' />
          <PinInputField backgroundColor='rgba(255, 121, 121, 0.1)' color="#CF00FF" fontWeight='500' />
          <PinInputField backgroundColor='rgba(255, 121, 121, 0.1)' color="#CF00FF" fontWeight='500' />
        </PinInput>
      </HStack>
      <Text textAlign='center'>Didn't you receive any code?</Text>
      <Text
        textAlign='center'
        cursor='pointer'
        backgroundImage='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
        backgroundClip='text'
        color='transparent'
        onClick={onResend}
      >
        Resend
      </Text>
    </>
  );
};

export default Verify;
