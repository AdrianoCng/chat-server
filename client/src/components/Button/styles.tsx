import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px;
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5);
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: var(--primary);
    color: var(--primary);
    background-color: #fff;
    box-shadow: 0 0 5px rgba(var(--primary-rgb), 1);
  }
`;
