import * as Styled from './styles';

export default function Label({ ...props }: React.ComponentProps<'label'>) {
  return <Styled.Label {...props}>{props.children}</Styled.Label>;
}
