import { useToast } from '@chakra-ui/react';
import Modal from '../common/Modal';
import TextInput from '../common/TextInput';

interface ProfileLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileLink: string;
}

const ProfileLinkModal = ({
  isOpen,
  onClose,
  profileLink,
}: ProfileLinkModalProps) => {
  const toast = useToast();

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_WEP_URL}/${profileLink}`
    );
    toast({
      title: 'Profile Link',
      description: 'Copied profile link successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Profile Link'
      body={
        <TextInput
          value={`${process.env.REACT_APP_WEP_URL}/${profileLink}`}
          placeholder='Profile link'
        />
      }
      primaryBtn='Copy Link'
      onPrimaryBtn={onCopyLink}
    />
  );
};

export default ProfileLinkModal;
