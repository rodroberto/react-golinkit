import { Text, Divider, Flex } from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Flex flexDirection='column'>
      <Flex alignItems='center'>
        <Divider />
        <Text width='full' textAlign='center' fontSize='20px' fontFamily='bold' color='purple'>
          {title}
        </Text>
        <Divider />
      </Flex>
      <Text textAlign='center' marginTop='12px'>{description}</Text>
    </Flex>
  );
};

export default PageHeader;
