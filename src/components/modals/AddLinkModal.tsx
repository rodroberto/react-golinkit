import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import TextInput from '../common/TextInput';
import ImageDropzone from '../common/ImageDropZone';
import { Text } from '@chakra-ui/react';
import { Api } from '../../lib/Api';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLink?: LinkType;
}

const AddLinkModal = ({ isOpen, onClose, selectedLink }: AddLinkModalProps) => {
  const [linkName, setLinkName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    if (selectedLink) {
      setLinkName(selectedLink.title);
      setLink(selectedLink.url);
      setImage(selectedLink.imageName);
    } else {
      setLinkName('');
      setLink('');
      setImage('');
    }
  }, [selectedLink]);

  const onSubmit = async () => {
    if (selectedLink) {
      const { data } = await Api.put(
        `/links/${selectedLink._id}`,
        {
          image,
          title: linkName,
          url: link,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    } else {
      const { data } = await Api.post(
        '/links',
        {
          image,
          title: linkName,
          url: link,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedLink ? 'Update Link' : 'Add Link'}
      body={
        <>
          <Text textAlign='center' marginBottom='12px'>
            Upload Icon
          </Text>
          <ImageDropzone
            width='100px'
            height='100px'
            image={image}
            onSetImage={(val: string) => setImage(val)}
          />
          <TextInput
            value={linkName}
            onChange={(val: string) => setLinkName(val)}
            placeholder='Link title'
            margin='12px 0px 12px'
          />
          <TextInput
            value={link}
            onChange={(val: string) => setLink(val)}
            placeholder='Link url'
          />
        </>
      }
      primaryBtn='Submit'
      isPrimaryBtnDisabled={!link || !linkName || !link}
      onPrimaryBtn={onSubmit}
    />
  );
};

export default AddLinkModal;
