import React from 'react';
import calendar_2024 from '../../../assets/calendario_academico_2024-1.png';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { MainScreen } from '../../shared/Shared.style';

const Calendar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography color="primary">{t('calendar.TITLE')}</Typography>
      </MainScreen.Title>
      <MainScreen.Content>
        <img src={calendar_2024} width={'100%'} />
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Calendar;
