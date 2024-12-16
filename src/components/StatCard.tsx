import { Flex, SimpleGrid } from '@chakra-ui/react';
import LinkItem from './LinkItem';
import MiniStat from './MiniStat';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteStatModal from './modals/DeleteStatModal';
import { useState } from 'react';
import { Api } from '../lib/Api';

interface StatCardProps {
  imageName: any;
  title: string;
  statsCount: {
    todayCount: number;
    weekCount: number;
    monthCount: number;
  };
  linkId: string;
  onUpdateLinks: () => void;
}

const StatCard = ({ imageName, title, statsCount, linkId, onUpdateLinks }: StatCardProps) => {
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

  const TOKEN = localStorage.getItem('token');

  const onCloseDelteModal = () => {
    setIsOpenDelete(false);
  };

  const onDeleteLink = () => {
    setIsOpenDelete(true);
  };

  const onConfirmDelete = async () => {
    setIsOpenDelete(false);
    const { data } = await Api.delete(`/stats/${linkId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    onUpdateLinks();
  };

  return (
    <Flex
      flexDirection='column'
      border='1px solid #e2e8f0'
      padding='12px'
      borderRadius='12px'
      gap={4}
    >
      <LinkItem
        imageName={imageName}
        title={title}
        actionIcon={<DeleteIcon color='#ff0000' />}
        onAction={onDeleteLink}
        backgroundColor='rgba(255, 121, 121, 0.1)'
      />
      <SimpleGrid gap={1} columns={3}>
        <MiniStat title='Today' count={statsCount.todayCount} />
        <MiniStat title='Week' count={statsCount.weekCount} />
        <MiniStat title='Month' count={statsCount.monthCount} />
      </SimpleGrid>
      <DeleteStatModal
        isOpen={isOpenDelete}
        onClose={onCloseDelteModal}
        onConfirm={onConfirmDelete}
      />
    </Flex>
  );
};

export default StatCard;
