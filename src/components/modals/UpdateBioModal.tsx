import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import TextInput from '../common/TextInput';
import ImageDropzone from '../common/ImageDropZone';
import { Text, Textarea } from '@chakra-ui/react';
import { Api } from '../../lib/Api';

interface UpdateBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  bio: string;
}

const UpdateBioModal = ({
  isOpen,
  onClose,
  bio: initialBio,
}: UpdateBioModalProps) => {
  const [bio, setBio] = useState<string>(initialBio);
  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio]);

  const onSubmit = async () => {
    const { data } = await Api.put(
      `/users/update-bio`,
      {
        bio,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Update Bio'
      body={<Textarea value={bio} onChange={(e) => setBio(e.target.value)} />}
      primaryBtn='Submit'
      isPrimaryBtnDisabled={!bio}
      onPrimaryBtn={onSubmit}
    />
  );
};

export default UpdateBioModal;
