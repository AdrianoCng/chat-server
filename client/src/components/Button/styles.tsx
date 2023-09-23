import styled, { css } from 'styled-components';

const primaryButtonStyles = css`
  background-color: var(--primary);
  color: #fff;
  border: none;
  box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5);
`;

const secondaryButtonStyles = css`
  border: var(--primary);
  color: var(--primary);
  background-color: #fff;
  box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5);
`;

export const Button = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: 10px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5px;

  ${({ $variant }) =>
    $variant === 'primary' ? primaryButtonStyles : secondaryButtonStyles}

  &:hover {
    ${({ $variant }) =>
      $variant === 'primary' ? secondaryButtonStyles : primaryButtonStyles}
  }
`;
