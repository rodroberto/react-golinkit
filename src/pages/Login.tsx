import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import AuthLayout from '../components/layouts/AuthLayout';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/common/TextInput';
import { TextInputType } from '../lib/constants/global.constants';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const onLogin = () => {
    console.log('onlogin');
  };

  return (
    <AuthLayout onBack={() => navigate(-1)}>
      <Flex flexDirection='column'>
        <PageHeader title='Login' description='Please login to continue' />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={(val: string) => setEmail(val)}
          margin='24px 0px 16px 0px'
          leftIcon={<EmailIcon color='gray.300' />}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChange={(val: string) => setPassword(val)}
          leftIcon={<LockIcon color='gray.300' />}
          rightIcon={
            isPasswordVisible ? (
              <ViewOffIcon color='gray.300' />
            ) : (
              <ViewIcon color='gray.300' />
            )
          }
          onRightIcon={() => setIsPasswordVisible((prev) => !prev)}
          type={isPasswordVisible ? TextInputType.TEXT : TextInputType.PASSWORD}
        />
        <Text
          textAlign='right'
          marginTop='16px'
          cursor='pointer'
          color='purple'
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </Text>
      </Flex>
      <Flex flexDirection='column'>
        <Button onClick={onLogin}>Login</Button>
        <Flex marginTop='12px'>
          <Text>Don't have an account?</Text>
          <Text
            cursor='pointer'
            color='purple'
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Text>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
