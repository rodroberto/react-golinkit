import { ReactNode, useState } from 'react';
import { Divider, EmailIcon, Text } from '@chakra-ui/icons';

import Modal from '../common/Modal';
import TextInput from '../common/TextInput';
import { UpdateEmailStep } from '../../lib/constants/global.constants';
import Verify from '../Verify';

interface UpdateEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateEmailModal = ({ isOpen, onClose }: UpdateEmailModalProps) => {
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');
  const [step, setStep] = useState<UpdateEmailStep>(UpdateEmailStep.EMAIL_STEP);

  const onNext = () => {
    if (step === UpdateEmailStep.EMAIL_STEP) {
        setStep(UpdateEmailStep.VERIFY_STEP)
    } else {

        onClose();
    }
  };

  const stepMapper: Record<UpdateEmailStep, ReactNode> = {
    [UpdateEmailStep.EMAIL_STEP]: (
      <>
        <Text>Current Email</Text>
        <Text>test@gmail.com</Text>
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
    [UpdateEmailStep.VERIFY_STEP]: <Verify email='test@gmail.com' />,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Update Email Address'
      body={stepMapper[step]}
      primaryBtn={step === UpdateEmailStep.EMAIL_STEP ? 'Next' : 'Verify'}
      onPrimaryBtn={onNext}
    />
  );
};

export default UpdateEmailModal;
