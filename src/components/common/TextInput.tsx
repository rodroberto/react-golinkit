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
  onChange: (val: string) => void;
  placeholder?: string;
  value?: string;
  margin?: string;
  onRightIcon?: () => void;
  type?: TextInputType;
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
}: TextInputProps) => {
  return (
    <InputGroup margin={margin}>
      {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
      {rightIcon && (
        <InputRightElement onClick={onRightIcon} cursor='pointer'>{rightIcon}</InputRightElement>
      )}
    </InputGroup>
  );
};

export default TextInput;
