import { useState } from 'react';
import Modal from '../common/Modal';
import TextInput from '../common/TextInput';
import { LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { TextInputType } from '../../lib/constants/global.constants';
import { Api } from '../../lib/Api';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const TOKEN = localStorage.getItem('token');

  const onUpdate = async () => {
    if (TOKEN) {
      const { data } = await Api.put(
        '/users/update-password',
        {
          currentPassword,
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    } else {
      console.log('No token found, user is not authorized');
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Change Password'
      body={
        <>
          <TextInput
            placeholder='Current Password'
            value={currentPassword}
            onChange={(val: string) => setCurrentPassword(val)}
            margin='0px 0px 16px 0px'
            leftIcon={<LockIcon color='gray.300' />}
            rightIcon={
              isCurrentPasswordVisible ? (
                <ViewOffIcon color='gray.300' />
              ) : (
                <ViewIcon color='gray.300' />
              )
            }
            onRightIcon={() => setIsCurrentPasswordVisible((prev) => !prev)}
            type={
              isPasswordVisible ? TextInputType.TEXT : TextInputType.PASSWORD
            }
          />
          <TextInput
            placeholder='Password'
            value={password}
            onChange={(val: string) => setPassword(val)}
            margin='0px 0px 16px 0px'
            leftIcon={<LockIcon color='gray.300' />}
            rightIcon={
              isPasswordVisible ? (
                <ViewOffIcon color='gray.300' />
              ) : (
                <ViewIcon color='gray.300' />
              )
            }
            onRightIcon={() => setIsPasswordVisible((prev) => !prev)}
            type={
              isPasswordVisible ? TextInputType.TEXT : TextInputType.PASSWORD
            }
          />
          <TextInput
            placeholder='Retype Password'
            value={confirmPassword}
            onChange={(val: string) => setConfirmPassword(val)}
            leftIcon={<LockIcon color='gray.300' />}
            rightIcon={
              isConfirmPasswordVisible ? (
                <ViewOffIcon color='gray.300' />
              ) : (
                <ViewIcon color='gray.300' />
              )
            }
            onRightIcon={() => setIsConfirmPasswordVisible((prev) => !prev)}
            type={
              isConfirmPasswordVisible
                ? TextInputType.TEXT
                : TextInputType.PASSWORD
            }
          />
        </>
      }
      primaryBtn='Update'
      onPrimaryBtn={onUpdate}
      isPrimaryBtnDisabled={
        !currentPassword ||
        !password ||
        !confirmPassword ||
        password !== confirmPassword
      }
    />
  );
};

export default ChangePasswordModal;
