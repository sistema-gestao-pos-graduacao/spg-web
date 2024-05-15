import React from 'react';
import * as S from '../Login.style';
import Logo from '../../shared/components/Logo';
import { StateAction } from '../../shared/Shared.types';
import { Container } from '@mui/material';
import LoginCard from './LoginCard';

const Login: React.FC<{ setLogged: StateAction<boolean> }> = ({
  setLogged,
}) => {
  return (
    <S.LoginStyle>
      <S.Background>
        <Logo />
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <LoginCard setLogged={setLogged} />
        </Container>
      </S.Background>
    </S.LoginStyle>
  );
};

export default Login;
