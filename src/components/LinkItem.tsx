import { Box, Flex } from '@chakra-ui/react';
import TextInput from './common/TextInput';

interface LinkCardProps {
  iconImage: any;
  title: string;
  actionIcon: any;
}

const LinkItem = ({ iconImage, title, actionIcon }: LinkCardProps) => {
  return (
    <Flex>
      <Box>iconimage</Box>
      <TextInput rightIcon={actionIcon} onRightIcon={() => {}} />
    </Flex>
  );
};

export default LinkItem;
