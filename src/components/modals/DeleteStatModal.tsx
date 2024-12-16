import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';
import Button from '../common/Button';

interface DeleteStatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteStatModal: React.FC<DeleteStatModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size='xs' isCentered>
      <ModalOverlay />
      <ModalContent borderRadius='16px'>
        <ModalBody maxHeight='600px' overflowY='auto'>
          <Flex flexDirection='column' alignItems='center' gap={2}>
            <Box marginTop='12px' padding='10px 14px' borderRadius='full' backgroundColor='rgba(255, 121, 121, 0.1)'>
              <DeleteIcon color='#ff0000' />
            </Box>
            <Text textAlign='center' fontWeight='600'>
              Confirm Delete
            </Text>
            <Text textAlign='center'>
              Are you sure you want to delete this stats?
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button onClick={onClose} isFullWidth>No</Button>
          <Button onClick={onConfirm} isFullWidth>Yes</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default DeleteStatModal;
