import { Box, Flex, Image } from '@chakra-ui/react';
import TextInput from './common/TextInput';
import { ReactNode } from 'react';
import { Api } from '../lib/Api';

interface LinkCardProps {
  imageName: string;
  title: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
  url?: string;
  linkId?: string;
  backgroundColor?: string;
}

const LinkItem = ({
  imageName,
  title,
  actionIcon,
  onAction,
  url,
  linkId,
  backgroundColor,
}: LinkCardProps) => {
  const createStat = async () => {
    const { data } = await Api.post('/stats', {
      linkId,
    });
  };

  const onLinkOpen = () => {
    createStat();
    window.open(url, '_blank');
  };

  return (
    <Flex gap={2}>
      <Image
        src={`${process.env.REACT_APP_BASE_URL}/links/${imageName}`}
        alt='add-icon'
        width='50px'
        height='48px'
        padding='10px'
        backgroundColor={backgroundColor || '#F8F8F8'}
        borderRadius='12px'
        border='1px solid #e2e8f0'
      />
      <TextInput
        value={title}
        isReadOnly
        rightIcon={actionIcon}
        onRightIcon={onAction}
        url={url}
        linkId={linkId}
        onClick={onLinkOpen}
        backgroundColor={backgroundColor}
      />
    </Flex>
  );
};

export default LinkItem;
