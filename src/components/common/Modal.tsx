import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, body }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size='sm'>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(5px) hue-rotate(90deg)'
      />
      <ModalContent marginTop='auto' marginBottom='10px' borderRadius='16px'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter justifyContent='center'>
          <Button onClick={onClose} isFullWidth>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
