import { Flex, SimpleGrid } from '@chakra-ui/react';
import LinkItem from './LinkItem';
import MiniStat from './MiniStat';

interface StatCardProps {
  iconImage: any;
  title: string;
  actionIcon: any;
  todayCount: number;
  weekCount: number;
  monthCount: number;
}

const StatCard = ({
  iconImage,
  title,
  actionIcon,
  todayCount,
  weekCount,
  monthCount,
}: StatCardProps) => {
  return (
    <Flex
      flexDirection='column'
      border='1px solid'
      padding='8px'
      borderRadius='6px'
    >
      <LinkItem iconImage={iconImage} title={title} actionIcon={actionIcon} />
      <SimpleGrid gap={4} columns={3}>
        <MiniStat title='Today' count={todayCount} />
        <MiniStat title='Week' count={weekCount} />
        <MiniStat title='Month' count={monthCount} />
      </SimpleGrid>
    </Flex>
  );
};

export default StatCard;
