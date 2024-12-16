import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import AuthLayout from '../components/layouts/AuthLayout';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/common/TextInput';
import { TextInputType } from '../lib/constants/global.constants';
import Button from '../components/common/Button';
import { Api } from '../lib/Api';
import { useAuth } from '../lib/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {login, isAuthenticated} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/profile')
  }, [isAuthenticated])

  const onLogin = async () => {
    login(email, password)
  };

  return (
    <AuthLayout onBack={() => navigate(-1)}>
      <Flex flexDirection='column' gap={4}>
        <PageHeader title='Login' description='Please login to continue' />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={(val: string) => setEmail(val)}
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
          marginLeft='auto'
          width='fix-content'
          cursor='pointer'
          backgroundImage='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
          backgroundClip='text'
          color='transparent'
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </Text>
      </Flex>
      <Flex flexDirection='column'>
        <Button isDisabled={!email || !password} onClick={onLogin}>Login</Button>
        <Flex marginTop='12px'>
          <Text>Don't have an account?</Text>

          <Text
            backgroundImage='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
            backgroundClip='text'
            color='transparent'
            cursor='pointer'
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
