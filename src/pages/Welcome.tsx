import { Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../components/layouts/AuthLayout';
import WelcomeBtn from '../components/WelcomeBtn';

const Welcome = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate('/login');
  };

  const onSignup = () => {
    navigate('/signup');
  };

  return (
    <AuthLayout>
      <Flex
        flexDirection='column'
        alignItems='center'
        height='full'
        justifyContent='center'
        gap={32}
      >
        <Flex flexDirection='column' alignItems='center'>
          <Text
            fontSize='20px'
            fontWeight='500'
            backgroundImage='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
            backgroundClip='text'
            color='transparent'
          >
            Welcome to golinkit.com
          </Text>
          <Text fontSize='14px' textAlign='center'>
            Please login your account, if you don't have an account, please sign
            up
          </Text>

        </Flex>
        <Flex gap={4}>
          <WelcomeBtn
            icon='/assets/login-icon.png'
            title='Login'
            onClick={onLogin}
          />
          <WelcomeBtn
            icon='/assets/signup-icon.png'
            title='Sign Up'
            onClick={onSignup}
          />
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Welcome;
