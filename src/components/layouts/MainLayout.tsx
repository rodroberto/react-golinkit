import { PropsWithChildren } from 'react';
import { Box, Container } from '@chakra-ui/react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box background='gray'>
      <Container
        background='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
        height='100vh'
        padding='0px'
        borderRadius='16px'
      >
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
