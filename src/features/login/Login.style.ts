import styled from 'styled-components';

import Vector from '../../assets/Vector.png';
import { Box } from '@mui/system';

export const LoginStyle = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.light_gray};
`;

export const Background = styled.div`
  background-image: url(${Vector});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  border-radius: 30px;
`;

export const ModalPassword = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.white};
  padding: 1rem;
  border-radius: 1rem;
  width: 30rem;
  height: auto;
  gap: 1rem;
  button {
    align-self: center;
  }
`;
