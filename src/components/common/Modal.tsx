import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  primaryBtn?: string;
  onPrimaryBtn?: () => void;
  isPrimaryBtnDisabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  primaryBtn,
  onPrimaryBtn,
  isPrimaryBtnDisabled
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size='sm'>
      <ModalOverlay />
      <ModalContent marginTop='auto' marginBottom='10px' borderRadius='16px'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxHeight='600px' overflowY='auto'>{body}</ModalBody>
        {primaryBtn && (
          <ModalFooter justifyContent='center'>
            <Button isDisabled={isPrimaryBtnDisabled} onClick={onPrimaryBtn} isFullWidth>
              {primaryBtn}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
