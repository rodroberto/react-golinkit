import { useEffect, useState } from 'react';
import ChangeLink from '../ChangeLink';
import Modal from '../common/Modal';
import { Api } from '../../lib/Api';
import { useToast } from '@chakra-ui/react';

interface ChangeLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType;
  onUpdateUser: (user: UserType) => void;
}

const ChangeLinkModal = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}: ChangeLinkModalProps) => {
  const [profileLink, setProfileLink] = useState<string>('');
  const toast = useToast()

  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      setProfileLink(user?.profileLink || '');
    }
  }, [user]);

  const onUpdate = async () => {
    try {
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
      console.log("data", data)
      onUpdateUser(data);
      onClose();
    } catch (err) {
      toast({
        title: 'Update profile link',
        description: 'Profile link is already exist',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }

  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Profile Link'
      body={
        <ChangeLink
          profileImage={user?.profileImage || ''}
          backgroundImage={user?.backgroundImage || ''}
          username={user?.username || ''}
          bio={user?.bio || ''}
          profileLink={profileLink}
          onChangeProfileLink={(val: string) => setProfileLink(val)}
        />
      }
      primaryBtn='Update'
      onPrimaryBtn={onUpdate}
    />
  );
};

export default ChangeLinkModal;
