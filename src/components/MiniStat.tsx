import { Flex, Text, VStack } from '@chakra-ui/react';

interface MiniStatProps {
  title: string;
  count: number;
}

const MiniStat = ({ title, count }: MiniStatProps) => {
  return (
    <Flex
      border='1px solid #e2e8f0'
      borderRadius='12px'
      padding='6px'
      flexDirection='column'
      alignItems='center'
    >
      <Text>{title}</Text>
      <Text fontWeight='600'>{count}</Text>
    </Flex>
  );
};

export default MiniStat;
