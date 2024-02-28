import React from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ScheduleTable from './ScheduleTable';

const Chat: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography color="primary">{t('schedule.TITLE')}</Typography>
        <Button
          style={{ borderRadius: '1.5rem' }}
          size="small"
          variant="contained"
        >
          {t('schedule.SAVE')}
        </Button>
      </MainScreen.Title>
      <MainScreen.Content>
        <ScheduleTable />
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Chat;
