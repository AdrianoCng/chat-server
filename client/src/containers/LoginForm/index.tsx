import { useRef } from 'react';

import * as Styled from './styles';

import Button from '@components/Button';
import Input from '@components/Input';
import Label from '@components/Label';
import Form from '@/components/Form';
import FormGroup from '@/components/FormGroup';

export default function LoginForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <Styled.Container>
      <Form>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" ref={usernameRef} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" ref={passwordRef} />
        </FormGroup>

        <Styled.FormSpan>
          Don't have an account?{' '}
          <Styled.FormLink href="#">Sign up</Styled.FormLink>
        </Styled.FormSpan>

        <Button type="submit" $variant="primary">
          Log in
        </Button>
      </Form>
    </Styled.Container>
  );
}
