import { Text, VStack } from '@chakra-ui/react';

interface MiniStatProps {
  title: string;
  count: number;
}

const MiniStat = ({ title, count }: MiniStatProps) => {
  return (
    <VStack>
      <Text>{title}</Text>
      <Text>{count}</Text>
    </VStack>
  );
};

export default MiniStat;
