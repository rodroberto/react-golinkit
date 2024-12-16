import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text, useToast } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import AuthLayout from '../components/layouts/AuthLayout';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/common/TextInput';
import { TextInputType } from '../lib/constants/global.constants';
import { ForgotPasswordStep } from '../lib/constants/auth.constants';
import Verify from '../components/Verify';
import Button from '../components/common/Button';
import { Api } from '../lib/Api';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [step, setStep] = useState<ForgotPasswordStep>(
    ForgotPasswordStep.EMAIL_STEP
  );
  const [verifyCode, setVerifyCode] = useState<string>('');

  const navigate = useNavigate();
  const toast = useToast();

  const onBack = () => {
    if (step === ForgotPasswordStep.EMAIL_STEP) {
      navigate(-1);
      return;
    }
    setStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (step === ForgotPasswordStep.RESET_STEP) {
      const { data } = await Api.post(
        '/users/reset-password',
        { email, password }
      );
      if (data.result) {
        toast({
          title: 'Reset password',
          description: 'Password reset successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/login')
      }
      return;
    } else if (step === ForgotPasswordStep.EMAIL_STEP) {
      sendVerification();
    } else if (step === ForgotPasswordStep.VERIFY_STEP) {
      const { data } = await Api.post(
        '/users/verify',
        { verifyCode, email }
      );
      if (data.result) {
        toast({
          title: 'Reset password',
          description: 'Email verified successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setStep((prev) => prev + 1);
      }
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
      if (step === ForgotPasswordStep.EMAIL_STEP) {
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

  const stepMapper: Record<ForgotPasswordStep, ReactNode> = {
    [ForgotPasswordStep.EMAIL_STEP]: (
      <>
        <PageHeader
          title='Forgot Password'
          description='Enter your email address to reset your password'
        />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={(val: string) => setEmail(val)}
          margin='24px 0px 16px 0px'
          leftIcon={<EmailIcon color='gray.300' />}
        />
      </>
    ),
    [ForgotPasswordStep.VERIFY_STEP]: (
      <Verify
        email={email as string}
        onChange={(val: string) => setVerifyCode(val)}
        onResend={sendVerification}
      />
    ),
    [ForgotPasswordStep.RESET_STEP]: (
      <>
        <PageHeader
          title='Reset Password'
          description='Enter your email address to reset your password'
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
  };

  const stepButtonMapper: Record<ForgotPasswordStep, string> = {
    [ForgotPasswordStep.EMAIL_STEP]: 'Send OTP',
    [ForgotPasswordStep.VERIFY_STEP]: 'Verify',
    [ForgotPasswordStep.RESET_STEP]: 'Submit',
  };

  const isDisabledButtonMapper: Record<ForgotPasswordStep, boolean> = {
    [ForgotPasswordStep.EMAIL_STEP]: !email,
    [ForgotPasswordStep.VERIFY_STEP]: verifyCode.length < 4,
    [ForgotPasswordStep.RESET_STEP]:
      !password || !confirmPassword || password !== confirmPassword,
  };

  return (
    <AuthLayout onBack={onBack}>
      <Flex flexDirection='column' gap={4}>
        {stepMapper[step]}
      </Flex>
      <Flex flexDirection='column'>
        <Button onClick={onNext} isDisabled={isDisabledButtonMapper[step]}>
          {stepButtonMapper[step]}
        </Button>
        {step === ForgotPasswordStep.EMAIL_STEP && (
          <Flex marginTop='12px'>
            <Text>Don't have an account?</Text>
            <Text
              cursor='pointer'
              backgroundImage='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
              backgroundClip='text'
              color='transparent'
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Text>
          </Flex>
        )}
      </Flex>
    </AuthLayout>
  );
};

export default ForgotPassword;
