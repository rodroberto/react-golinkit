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
      _hover={{ color: 'blue', background: 'purple', borderRadius: '24px' }}
      onClick={onClick}
    >
      {title}
    </Box>
  );
};

export default MenuItem;
