import React from 'react';
import { TitleStyle as S } from '../login.style';
import { useTranslation } from 'react-i18next';

const LoginTitle: React.FC = () => {
  const { t } = useTranslation();
  return (
    <S.Content>
      <S.Title> {t('login.TITLE')}</S.Title>
      <S.SubtitleContent>
        <S.Subtitle>{t('login.SUBTITLE_PRIMARY')}</S.Subtitle>
        <S.Subtitle>{t('login.SUBTITLE_SECONDARY')}</S.Subtitle>
      </S.SubtitleContent>
    </S.Content>
  );
};

export default LoginTitle;
