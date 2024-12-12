import { PropsWithChildren } from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons';

interface PageLayoutProps extends PropsWithChildren {
  onBack: () => void;
  title: string;
  isMenu?: boolean;
}

const PageLayout = ({ children, onBack, title, isMenu }: PageLayoutProps) => {
  return (
    <Flex flexDirection='column'>
      <Flex
        alignItems='center'
        justifyContent='center'
        padding='24px'
        position='relative'
        onClick={onBack}
      >
        <ChevronLeftIcon
          position='absolute'
          left='24px'
          cursor='pointer'
          fontSize='20px'
          color='white'
        />
        <Text color='white'>{title}</Text>
        {isMenu && (
          <HamburgerIcon
            position='absolute'
            right='24px'
            fontSize='20px'
            color='white'
          />
        )}
      </Flex>
      <Flex
        background='white'
        height='calc(100vh - 72px)'
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

export default PageLayout;
