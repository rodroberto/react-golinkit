import { MouseEventHandler, PropsWithChildren } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps extends PropsWithChildren {
  margin?: string;
  isFullWidth?: boolean;
  onClick?: MouseEventHandler<
    HTMLButtonElement | MouseEvent | HTMLAnchorElement
  >;
}

const Button = ({ children, margin, onClick, isFullWidth }: ButtonProps) => {
  return (
    <ChakraButton
      margin={margin}
      borderRadius='32px'
      onClick={onClick}
      {...(isFullWidth && { width: 'full' })}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
