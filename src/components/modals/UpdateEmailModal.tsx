import { ReactNode, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Divider, EmailIcon, Text } from '@chakra-ui/icons';

import Modal from '../common/Modal';
import TextInput from '../common/TextInput';
import { UpdateEmailStep } from '../../lib/constants/global.constants';
import Verify from '../Verify';
import { Api } from '../../lib/Api';

interface UpdateEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

const UpdateEmailModal = ({
  isOpen,
  onClose,
  currentEmail,
}: UpdateEmailModalProps) => {
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [step, setStep] = useState<UpdateEmailStep>(UpdateEmailStep.EMAIL_STEP);
  const [verifyCode, setVerifyCode] = useState<string>('');

  const toast = useToast();

  const sendVerification = async (isResend = false) => {
    const { data } = await Api.post(
      '/users/send-verification-code',
      { email, currentEmail, isResend },
    );
  };

  const onNext = async () => {
    if (step === UpdateEmailStep.EMAIL_STEP) {
      setStep(UpdateEmailStep.VERIFY_STEP);
      sendVerification();
    } else {
      const { data } = await Api.post(
        '/users/verify',
        { verifyCode, email },
      );
      if (data.result) {
        toast({
          title: 'Update Email',
          description: 'Email updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        onClose();
      }
    }
  };

  const stepMapper: Record<UpdateEmailStep, ReactNode> = {
    [UpdateEmailStep.EMAIL_STEP]: (
      <>
        <Text>Current Email</Text>
        <Text fontWeight='bold'>{currentEmail}</Text>
        <Divider marginTop='16px' marginBottom='16px' />
        <Text color='purple'>Update Email</Text>
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
    [UpdateEmailStep.VERIFY_STEP]: (
      <Verify
        email={email}
        onChange={(val: string) => setVerifyCode(val)}
        onResend={() => sendVerification(true)}
      />
    ),
  };

  const isPrimaryBtnDisabledMapper: Record<UpdateEmailStep, boolean> = {
    [UpdateEmailStep.EMAIL_STEP]:
      !email || !confirmEmail || email !== confirmEmail,
    [UpdateEmailStep.VERIFY_STEP]: verifyCode.length < 4,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Update Email Address'
      body={stepMapper[step]}
      primaryBtn={step === UpdateEmailStep.EMAIL_STEP ? 'Next' : 'Verify'}
      onPrimaryBtn={onNext}
      isPrimaryBtnDisabled={isPrimaryBtnDisabledMapper[step]}
    />
  );
};

export default UpdateEmailModal;
