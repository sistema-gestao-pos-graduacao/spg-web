import styled from 'styled-components';

import Vector from '../../assets/Vector.png';

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
