import { ReactNode, useEffect, useState } from 'react';
import PageLayout from '../components/layouts/PageLayout';
import { OnboardingStep } from '../lib/constants/global.constants';
import { Divider, Flex, Text, Textarea } from '@chakra-ui/react';
import ImageDropzone from '../components/common/ImageDropZone';
import ChangeLink from '../components/ChangeLink';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Api } from '../lib/Api';

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.INFO_STEP);
  const [profileImage, setProfileImage] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profileLink, setProfileLink] = useState<string>('');
  const [user, setUser] = useState<UserType>();

  const TOKEN = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const onBack = () => {
    if (step === OnboardingStep.INFO_STEP) {
      navigate(-1);
    }
    setStep(OnboardingStep.INFO_STEP);
  };

  const getCurrentUser = async () => {
    const { data } = await Api.get('/users/current', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    setUser(data);
  };

  const onNext = async () => {
    if (step === OnboardingStep.LINK_STEP) {
      const { data } = await Api.put(
        `/users/profile-link`,
        {
          profileLink,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      navigate('/profile');
    } else {
      const { data } = await Api.put(
        `/users/onboarding`,
        {
          profileImage,
          backgroundImage,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setUser(data);
      setStep(OnboardingStep.LINK_STEP);
    }
  };

  const stepMapper: Record<OnboardingStep, ReactNode> = {
    [OnboardingStep.INFO_STEP]: (
      <Flex flexDirection='column' gap={4}>
        <ImageDropzone
          isCircle
          width='140px'
          height='140px'
          image={profileImage}
          onSetImage={(val: string) => setProfileImage(val)}
        />
        <Text textAlign='center'>Select Profile</Text>
        <Divider />
        <Text>Select Background Photo</Text>
        <ImageDropzone
          width='full'
          height='180px'
          image={backgroundImage}
          onSetImage={(val: string) => setBackgroundImage(val)}
        />
        <Text>Profile Bio</Text>
        <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </Flex>
    ),
    [OnboardingStep.LINK_STEP]: (
      <ChangeLink
        email={user?.email || ''}
        profileImage={user?.profileImage || ''}
        backgroundImage={user?.backgroundImage || ''}
        profileLink={profileLink}
        onChangeProfileLink={(val: string) => setProfileLink(val)}
      />
    ),
  };

  const isDisabledMapper: Record<OnboardingStep, boolean> = {
    [OnboardingStep.INFO_STEP] : !profileImage || !backgroundImage || !bio,
    [OnboardingStep.LINK_STEP]: !profileLink
  }

  return (
    <PageLayout onBack={onBack} title='Finish Profile'>
      {stepMapper[step]}
      <Button
        isDisabled={isDisabledMapper[step]}
        onClick={onNext}
      >
        Done
      </Button>
    </PageLayout>
  );
};

export default Onboarding;
