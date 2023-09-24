import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 40px;
`;

// export const Form = styled.form`
//   background: #fff;
//   display: flex;
//   align-items: center;
//   padding: 20px;
//   flex-direction: column;
//   gap: 20px;
//   border-radius: 10px;
//   box-shadow: 1px 1px 5px rgba(var(--primary-rgb), 0.2);
//   transform: translateY(-50%);
// `;

// export const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export const FormSpan = styled.span`
  font-size: 1.4rem;
  color: var(--primary);
`;

export const FormLink = styled.a`
  color: inherit;
  font-weight: 500;
`;
