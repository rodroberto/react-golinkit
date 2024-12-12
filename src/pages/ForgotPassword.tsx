import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import AuthLayout from '../components/layouts/AuthLayout';
import PageHeader from '../components/PageHeader';
import TextInput from '../components/common/TextInput';
import { TextInputType } from '../lib/constants/global.constants';
import { ForgotPasswordStep } from '../lib/constants/auth.constants';
import Verify from '../components/Verify';

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

  const navigate = useNavigate();

  const onBack = () => {
    if (step === ForgotPasswordStep.EMAIL_STEP) {
      navigate(-1)
      return;
    };
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (step === ForgotPasswordStep.RESET_STEP) {
      console.log('Submit');
      return;
    };
    setStep((prev) => prev + 1);
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
    [ForgotPasswordStep.VERIFY_STEP]: <Verify email={email as string} />,
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
          margin='24px 0px 16px 0px'
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
  }

  return (
    <AuthLayout onBack={onBack}>
      <Flex flexDirection='column'>{stepMapper[step]}</Flex>
      <Flex flexDirection='column'>
        <Button onClick={onNext}>{stepButtonMapper[step]}</Button>
        {step === ForgotPasswordStep.EMAIL_STEP && (
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
        )}
      </Flex>
    </AuthLayout>
  );
};

export default ForgotPassword;
