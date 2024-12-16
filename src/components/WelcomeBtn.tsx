import { Box, Flex, Image, Text } from '@chakra-ui/react';

interface WelcomeBtnProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const WelcomeBtn = ({ icon, title, onClick }: WelcomeBtnProps) => {
  return (
    <Box
      onClick={onClick}
      cursor='pointer'
      borderRadius='12px'
      padding='40px'
      border='1px solid #dd0ab9'
      backgroundColor='rgba(255, 121, 121, 0.1)'
    >
      <Flex flexDirection='column' gap={2} alignItems='center'>
        <Image src={icon} width='52px' height='52px' />
        <Text>{title}</Text>
      </Flex>
    </Box>
  );
};

export default WelcomeBtn;
