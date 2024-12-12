import Modal from '../common/Modal';
import TextInput from '../common/TextInput';

interface ProfileLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileLinkModal = ({ isOpen, onClose }: ProfileLinkModalProps) => {
  const onCopyLink = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Profile Link'
      body={
        <TextInput
          // value={linkName}
          // onChange={(val: string) => setLinkName(val)}
          placeholder='Profile link'
        />
      }
      primaryBtn='Copy Link'
      onPrimaryBtn={onCopyLink}
    />
  );
};

export default ProfileLinkModal;
