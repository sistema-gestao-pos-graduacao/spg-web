import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';

const Configurations: React.FC = () => {
  const { t } = useTranslation();
  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('configurations.TITLE')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content></MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Configurations;
