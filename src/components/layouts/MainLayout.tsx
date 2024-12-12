import { PropsWithChildren } from 'react';
import { Box, Container } from '@chakra-ui/react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box background='gray'>
      <Container background='red' height='100vh' padding='0px' borderRadius='16px'>
        {children}
      </Container>
    </Box>
  );
};

export default MainLayout;
