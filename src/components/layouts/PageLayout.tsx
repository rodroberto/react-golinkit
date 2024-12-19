import { PropsWithChildren } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps extends PropsWithChildren {
  onBack: () => void;
  title: string;
  isMenu?: boolean;
  onMenuOpen?: () => void;
}

const PageLayout = ({
  children,
  onBack,
  title,
  isMenu,
  onMenuOpen,
}: PageLayoutProps) => {
  const location = useLocation();
  console.log('location', location.pathname);

  return (
    <Flex flexDirection='column'>
      <Flex
        alignItems='center'
        justifyContent='center'
        padding='24px'
        position='relative'
      >
        {(location.pathname === '/forgot-password' ||
          location.pathname === '/signup') && (
            <ChevronLeftIcon
              position='absolute'
              left='24px'
              cursor='pointer'
              fontSize='20px'
              color='white'
              onClick={onBack}
            />
          )}

        <Text color='white'>{title}</Text>
        {isMenu && (
          <HamburgerIcon
            position='absolute'
            right='24px'
            fontSize='20px'
            color='white'
            cursor='pointer'
            onClick={onMenuOpen}
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
