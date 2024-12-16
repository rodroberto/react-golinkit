import { Flex } from '@chakra-ui/react';
import Modal from '../common/Modal';
import StatCard from '../StatCard';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkType[];
  onUpdateLinks: () => void;
}

const getStatsCounts = (stats: any[]) => {
  // Get the current date and time
  const now = new Date();

  // Helper function to check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Helper function to check if a date is in the current week
  const isCurrentWeek = (date: Date) => {
    const currentDate = new Date(); // Get the current date, don't mutate it
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Get the Sunday of the current week

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Get the Saturday of the current week

    // Compare if the date is within the current week (Sunday to Saturday)
    return (
      date.getDate() >= startOfWeek.getDate() &&
      date.getDate() <= endOfWeek.getDate()
    );
  };

  // Helper function to check if a date is in the current month
  const isCurrentMonth = (date: Date) => {
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  };

  // Initialize counters
  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;

  // Loop through each stat and check its `createdAt` field
  stats.forEach((stat) => {
    const createdAt = new Date(stat.createdAt);

    // Check if this stat's createdAt is today, in the current week, or in the current month
    if (isToday(createdAt)) todayCount++;
    if (isCurrentWeek(createdAt)) weekCount++;
    if (isCurrentMonth(createdAt)) monthCount++;
  });

  // Return the counts
  return {
    todayCount,
    weekCount,
    monthCount,
  };
};

const StatsModal = ({ isOpen, onClose, links, onUpdateLinks }: StatsModalProps) => {

  return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title='Stats'
        body={
          <Flex flexDirection='column' gap={2}>
            {links.map(({ imageName, title, stats, _id }: LinkType) => (
              <StatCard
                imageName={imageName}
                title={title}
                statsCount={getStatsCounts(stats ?? [])}
                linkId={_id || ''}
                onUpdateLinks={onUpdateLinks}
              />
            ))}
          </Flex>
        }
      />
  );
};

export default StatsModal;
