import * as Styled from './styles';

export default function Button({ ...props }: React.ComponentProps<'button'>) {
  return <Styled.Button {...props} />;
}
