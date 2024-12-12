import { ReactNode, useState } from 'react';
import PageLayout from '../components/layouts/PageLayout';
import { OnboardingStep } from '../lib/constants/global.constants';
import { Button, Divider, Flex, Text, Textarea } from '@chakra-ui/react';
import ImageDropzone from '../components/common/ImageDropZone';
import ChangeLink from '../components/ChangeLink';

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.INFO_STEP);

  const onBack = () => {};

  const onNext = () => {
    if (step === OnboardingStep.LINK_STEP) {
        console.log('finish')
    }
    setStep(OnboardingStep.LINK_STEP)
  }

  const stepMapper: Record<OnboardingStep, ReactNode> = {
    [OnboardingStep.INFO_STEP]: <Flex flexDirection='column' gap={4}>
        <ImageDropzone isCircle width='140px' height='140px' />
        <Text textAlign='center'>Select Profile</Text>
        <Divider />
        <Text>Select Background Photo</Text>
        <ImageDropzone width='full' height='180px' />
        <Text>Profile Bio</Text>
        <Textarea />
    </Flex>,
    [OnboardingStep.LINK_STEP]: <ChangeLink />,
  };

  return (
    <PageLayout onBack={onBack} title='Finish Profile'>
      {stepMapper[step]}
      <Button onClick={onNext}>Done</Button>
    </PageLayout>
  );
};

export default Onboarding;
