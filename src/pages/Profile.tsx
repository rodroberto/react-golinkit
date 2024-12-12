import { Button, Flex, Image, Text } from '@chakra-ui/react';
import PageLayout from '../components/layouts/PageLayout';
import Modal from '../components/common/Modal';
import { useState } from 'react';
import TextInput from '../components/common/TextInput';

const Profile = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [linkName, setLinkName] = useState<string>('')
    const [link, setLink] = useState<string>('')

  const onBack = () => {};

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <PageLayout onBack={onBack} title='Profile'>
      <Flex flexDirection='column'>
        <Flex justifyContent='center'>
          <Image src='/assets/profile-bg.png' alt='Logo' width='100%' />
        </Flex>
        <Flex justifyContent='center'>
          <Image
            borderRadius='full'
            marginTop='-65px'
            boxSize='130px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
          />
        </Flex>
        <Text textAlign='center' marginY='16px'>email</Text>
        <Text textAlign='center'>description</Text>
      </Flex>
      <Button onClick={() => setIsOpen(true)}>Add Link</Button>
      <Modal isOpen={isOpen} onClose={onClose} title='Add Link' body={
        <>
            <TextInput value={linkName} onChange={(val: string) => setLinkName(val)} placeholder='Link title' margin='0px 0px 12px' />
            <TextInput value={link} onChange={(val: string) => setLink(val)} placeholder='Link url' />
        </>
      } />
    </PageLayout>
  );
};

export default Profile;
