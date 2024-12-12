import { PropsWithChildren } from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

interface AuthLayoutProps extends PropsWithChildren {
  onBack?: () => void;
}

const AuthLayout = ({ children, onBack }: AuthLayoutProps) => {
  return (
    <Flex flexDirection='column'>
      {onBack && (
        <Flex
          alignItems='center'
          cursor='pointer'
          padding='24px 24px 0px'
          onClick={onBack}
        >
          <ChevronLeftIcon fontSize='20px' color='white' />
          <Text color='white' paddingLeft='8px'>
            Back
          </Text>
        </Flex>
      )}

      <Flex justifyContent='center' paddingY='40px'>
        <Image src='/assets/logo.png' alt='Logo' />
      </Flex>
      <Flex
        background='white'
        height={onBack ? 'calc(100vh - 208px)' : 'calc(100vh - 160px)'}
        borderRadius='16px'
        flexDirection='column'
        justifyContent='space-between'
        padding='16px'
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
