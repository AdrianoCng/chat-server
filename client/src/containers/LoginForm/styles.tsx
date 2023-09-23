import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 40px;
`;

export const Form = styled.form`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(var(--primary-rgb), 0.2);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLink = styled.a`
  color: var(--primary);
  text-decoration: underline;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 100ms ease;

  &:hover {
    font-weight: bold;
  }
`;
