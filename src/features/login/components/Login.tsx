import React from 'react';
import * as S from '../login.style';
import LoginTitle from './LoginTitle';

const Login: React.FC = () => {
  return (
    <S.LoginStyle>
      <div style={{ display: 'flex', padding: '1.2rem' }}>
        <LoginTitle />
      </div>
    </S.LoginStyle>
  );
};

export default Login;
