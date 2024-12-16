import { Box } from '@chakra-ui/react';

interface MenuItemProps {
  title: string;
  onClick: () => void;
}

const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <Box
      cursor='pointer'
      padding='10px 16px'
      _hover={{ color: '#D818C3', background: 'rgba(255, 121, 121, 0.1)', borderRadius: '24px' }}
      onClick={onClick}
    >
      {title}
    </Box>
  );
};

export default MenuItem;
