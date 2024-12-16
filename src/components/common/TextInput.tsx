import { ReactNode } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import { TextInputType } from '../../lib/constants/global.constants';

interface TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (val: string) => void;
  placeholder?: string;
  value?: string;
  margin?: string;
  onRightIcon?: () => void;
  type?: TextInputType;
  isReadOnly?: boolean;
  url?: string;
  linkId?: string;
  onClick?: () => void;
  backgroundColor?: string;
}

const TextInput = ({
  leftIcon,
  rightIcon,
  onChange,
  placeholder,
  value,
  margin,
  onRightIcon,
  type = TextInputType.TEXT,
  isReadOnly,
  onClick,
  backgroundColor
}: TextInputProps) => {
  return (
    <InputGroup margin={margin}>
      {leftIcon && <InputLeftElement marginTop='4px'>{leftIcon}</InputLeftElement>}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type={type}
        backgroundColor={backgroundColor || '#F8F8F8'}
        borderRadius='12px'
        size='lg'
        fontSize='16px'
        readOnly={isReadOnly}
        {...isReadOnly && !rightIcon && {cursor: 'pointer'}}
        {...isReadOnly && !rightIcon && {onClick}}
      />
      {rightIcon && (
        <InputRightElement marginTop='4px' onClick={onRightIcon} cursor='pointer'>{rightIcon}</InputRightElement>
      )}
    </InputGroup>
  );
};

export default TextInput;
