import ChangeLink from '../ChangeLink';
import Modal from '../common/Modal';

interface ChangeLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeLinkModal = ({ isOpen, onClose }: ChangeLinkModalProps) => {
  const onUpdate = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Profile Link'
      body={<ChangeLink />}
      primaryBtn='Update'
      onPrimaryBtn={onUpdate}
    />
  );
};

export default ChangeLinkModal;
