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
        <Text
          fontSize='20px'
          fontWeight='500'
          backgroundImage='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
          backgroundClip='text'
          color='transparent'
          width='full'
          textAlign='center'
        >
          {title}
        </Text>
        <Divider />
      </Flex>
      <Text textAlign='center' fontSize='14px' marginTop='12px'>{description}</Text>
    </Flex>
  );
};

export default PageHeader;
