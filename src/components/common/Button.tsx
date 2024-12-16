import { MouseEventHandler, PropsWithChildren } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps extends PropsWithChildren {
  margin?: string;
  isFullWidth?: boolean;
  onClick?: MouseEventHandler<
    HTMLButtonElement | MouseEvent | HTMLAnchorElement
  >;
  isDisabled?: boolean;
}

const Button = ({ children, margin, onClick, isFullWidth, isDisabled = false }: ButtonProps) => {
  return (
    <ChakraButton
      margin={margin}
      borderRadius='24px'
      background='linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'
      color='white'
      onClick={onClick}
      {...(isFullWidth && { width: 'full' })}
      _hover={{background: 'linear-gradient(133.19deg, #F65B1A 2.22%, #CF00FF 94.24%)'}}
      isDisabled={isDisabled}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
