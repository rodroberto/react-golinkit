import { Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../components/layouts/AuthLayout';
import Button from '../components/common/Button';

const Welcome = () => {

    const navigate = useNavigate();

    const onLogin = () => {
        console.log("login")
        navigate('/login')
    }

    const onSignup = () => {
        console.log("onSignup")
        navigate('/signup')
    }

  return (
    <AuthLayout>
      <Flex flexDirection='column' alignItems='center'>
        <Text>Welcome to golinkit.com</Text>
        <Text>
          Please login your account, if you don't have an account, please sign
          up
        </Text>
      </Flex>
      <Flex flexDirection='column'>
        <Button margin='0px 0px 12px 0px' onClick={onLogin}>Login</Button>
        <Button  onClick={onSignup}>Sign up</Button>
      </Flex>
    </AuthLayout>
  );
};

export default Welcome;
