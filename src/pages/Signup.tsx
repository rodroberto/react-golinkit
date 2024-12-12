import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
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

  const navigate = useNavigate();

  const onBack = () => {
    if (step === SignUpStep.EMAIL_STEP) {
      navigate(-1)
      return;
    };
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (step === SignUpStep.VERIFY_STEP) {
      console.log('onVerify');
      return;
    };
    setStep((prev) => prev + 1);
  };

  const stepMapper: Record<SignUpStep, ReactNode> = {
    [SignUpStep.EMAIL_STEP]: (
      <>
        <PageHeader title='Sign up' description='Please Sign up your account' />
        <TextInput
          placeholder='Email'
          value={email}
          onChange={(val: string) => setEmail(val)}
          margin='24px 0px 16px 0px'
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
          margin='24px 0px 16px 0px'
          leftIcon={<AddIcon color='gray.300' />}
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChange={(val: string) => setPassword(val)}
          margin='0px 0px 16px 0px'
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
    [SignUpStep.VERIFY_STEP]: <Verify email={email as string} />,
  };

  return (
    <AuthLayout onBack={onBack}>
      <Flex flexDirection='column'>{stepMapper[step]}</Flex>
      <Flex flexDirection='column'>
        <Button onClick={onNext}>
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
