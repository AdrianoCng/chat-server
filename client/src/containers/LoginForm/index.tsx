import { useRef } from 'react';

import * as Styled from './styles';

import Button from '@components/Button';
import Input from '@components/Input';
import Label from '@components/Label';

export default function LoginForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Styled.Container>
      <Styled.Form>
        <Styled.FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" ref={usernameRef} />
        </Styled.FormGroup>

        <Styled.FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" ref={passwordRef} />
        </Styled.FormGroup>

        <Styled.FormSpan>
          Don't have an account?{' '}
          <Styled.FormLink href="#">Sign up</Styled.FormLink>
        </Styled.FormSpan>

        <Button type="submit" $variant="primary">
          Log in
        </Button>
      </Styled.Form>
    </Styled.Container>
  );
}
