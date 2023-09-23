import styled, { css } from 'styled-components';

export const InputStyledComponent = styled.input<{ $fullWidth?: boolean }>`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: all 150ms ease;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:hover:not(:disabled) {
    border-color: rgba(var(--primary-rgb), 0.5);
  }

  &:focus:not(:disabled) {
    outline: none;
    border-color: rgba(var(--primary-rgb), 0.5);
    box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5);
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;
