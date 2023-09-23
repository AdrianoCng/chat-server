import * as Styled from './styles';
import React, { forwardRef } from 'react';

interface Props extends React.ComponentProps<'input'> {
  $fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <Styled.InputStyledComponent ref={ref} {...props} />;
});

export default Input;
