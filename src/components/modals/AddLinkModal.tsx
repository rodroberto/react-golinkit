import { useState } from 'react';
import Modal from '../common/Modal';
import TextInput from '../common/TextInput';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddLinkModal = ({ isOpen, onClose }: AddLinkModalProps) => {
  const [linkName, setLinkName] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const onSubmit = () => {
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Add Link'
      body={
        <>
          <TextInput
            value={linkName}
            onChange={(val: string) => setLinkName(val)}
            placeholder='Link title'
            margin='0px 0px 12px'
          />
          <TextInput
            value={link}
            onChange={(val: string) => setLink(val)}
            placeholder='Link url'
          />
        </>
      }
      primaryBtn='Submit'
      onPrimaryBtn={onSubmit}
    />
  );
};

export default AddLinkModal;
