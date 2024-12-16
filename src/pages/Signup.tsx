import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flex, Text, useToast } from '@chakra-ui/react';
import {
  AddIcon,
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';

import PageHeader from '../components/PageHeader';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import AuthLayout from '../components/layouts/AuthLayout';
import { SignUpStep } from '../lib/constants/auth.constants';
import { TextInputType } from '../lib/constants/global.constants';
import Verify from '../components/Verify';
import { Api } from '../lib/Api';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<SignUpStep>(SignUpStep.EMAIL_STEP);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>('');

  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramEmail = queryParams.get('email-verify');

  useEffect(() => {
    if (paramEmail) {
      setEmail(paramEmail);
      setStep(SignUpStep.VERIFY_STEP)
    }
  }, [paramEmail])

  const onBack = () => {
    if (step === SignUpStep.EMAIL_STEP) {
      navigate(-1);
      return;
    }
    setStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (step === SignUpStep.VERIFY_STEP) {
      const { data } = await Api.post(
        '/users/verify',
        { verifyCode, email },
      );
      if (data.result) {
        toast({
          title: 'Register',
          description: 'Registered successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/login');
      }
      return;
    } else if (step === SignUpStep.PASSWORDF_STEP) {
      const { data } = await Api.post('/users/register', {
        username,
        email,
        password,
      });
      if (data.result) {
        sendVerification();
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const sendVerification = async () => {
    const { data } = await Api.post(
      '/users/send-verification-code',
      { email }
    );
    if (data.result) {
      toast({
        title: 'Verify',
        description: 'Verification code sent',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      if (step === SignUpStep.PASSWORDF_STEP) {
        setStep((prev) => prev + 1);
      }
    } else {
      toast({
        title: 'Verify',
        description: 'Sending verification code failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const stepMapper: Record<SignUpStep, ReactNode> = {
    [SignUpStep.EMAIL_STEP]: (
      <>
        <PageHeader title='Sign up' description='Please Sign up your account' />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={(val: string) => setEmail(val)}
          leftIcon={<EmailIcon color='gray.300' />}
        />
        <TextInput
          placeholder='Confrim Email'
          value={confirmEmail}
          onChange={(val: string) => setConfirmEmail(val)}
          leftIcon={<EmailIcon color='gray.300' />}
        />
      </>
    ),
    [SignUpStep.PASSWORDF_STEP]: (
      <>
        <PageHeader title='Sign up' description='Please Sign up your account' />
        <TextInput
          placeholder='Username'
          value={username}
          onChange={(val: string) => setUsername(val)}
          leftIcon={<AddIcon color='gray.300' />}
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
        <TextInput
          placeholder='Retype Password'
          value={confirmPassword}
          onChange={(val: string) => setConfirmPassword(val)}
          leftIcon={<LockIcon color='gray.300' />}
          rightIcon={
            isConfirmPasswordVisible ? (
              <ViewOffIcon color='gray.300' />
            ) : (
              <ViewIcon color='gray.300' />
            )
          }
          onRightIcon={() => setIsConfirmPasswordVisible((prev) => !prev)}
          type={
            isConfirmPasswordVisible
              ? TextInputType.TEXT
              : TextInputType.PASSWORD
          }
        />
      </>
    ),
    [SignUpStep.VERIFY_STEP]: (
      <Verify
        email={email as string}
        onChange={(val: string) => setVerifyCode(val)}
        onResend={sendVerification}
      />
    ),
  };

  const btnDisabledMapper: Record<SignUpStep, boolean> = {
    [SignUpStep.EMAIL_STEP]: !email || !confirmEmail || email !== confirmEmail,
    [SignUpStep.PASSWORDF_STEP]:
      !username ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword,
    [SignUpStep.VERIFY_STEP]: verifyCode.length < 4,
  };

  return (
    <AuthLayout onBack={onBack}>
      <Flex flexDirection='column' gap={4}>
        {stepMapper[step]}
      </Flex>
      <Flex flexDirection='column'>
        <Button isDisabled={btnDisabledMapper[step]} onClick={onNext}>
          {step === SignUpStep.VERIFY_STEP ? 'Verify' : 'Next'}
        </Button>
        {step === SignUpStep.EMAIL_STEP && (
          <Flex marginTop='12px'>
            <Text>Already have an account?</Text>
            <Text
              cursor='pointer'
              color='purple'
              onClick={() => navigate('/login')}
            >
              Login
            </Text>
          </Flex>
        )}
      </Flex>
    </AuthLayout>
  );
};

export default Signup;
