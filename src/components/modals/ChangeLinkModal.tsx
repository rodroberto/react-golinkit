import { useEffect, useState } from 'react';
import ChangeLink from '../ChangeLink';
import Modal from '../common/Modal';
import { Api } from '../../lib/Api';

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

  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      setProfileLink(user?.profileLink || '');
    }
  }, [user]);

  const onUpdate = async () => {
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
    onUpdateUser(data);
    onClose();
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
          email={user?.email || ''}
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
