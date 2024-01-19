import React from 'react';
import { TitleStyle as S } from '../login.style';

const LoginTitle: React.FC = () => {
  return (
    <S.Content>
      <S.Title> SGP</S.Title>
      <S.SubtitleContent>
        <S.Subtitle>Portal</S.Subtitle>
        <S.Subtitle>Pós Graduação</S.Subtitle>
      </S.SubtitleContent>
    </S.Content>
  );
};

export default LoginTitle;
