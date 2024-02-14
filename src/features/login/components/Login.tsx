import React from 'react';
import * as S from '../Login.style';
import Logo from '../../shared/components/Logo';
import { Link } from 'react-router-dom';
import { StateAction } from '../../shared/Shared.types';
import { Button } from '@mui/material';

const Login: React.FC<{ setLogged: StateAction<boolean> }> = ({
  setLogged,
}) => {
  return (
    <S.LoginStyle>
      <Logo />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          style={{ height: '2rem' }}
          onClick={() => setLogged(true)}
        >
          <Link to={'/'}>Logar</Link>
        </Button>
      </div>
    </S.LoginStyle>
  );
};

export default Login;
