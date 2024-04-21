import React, { useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ScheduleTable from './ScheduleTable';
import { EventProps } from '../Schedule.types';
import Disciplines from './Disciplines';

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const [externalEvents, setExternalEvents] =
    useState<Partial<EventProps> | null>(null);
  const [events, setEvents] = useState<EventProps[]>([
    {
      start: new Date('2024/03/04 17:10'),
      end: new Date('2024/03/04 18:50'),
      title: '12345.01 - Controle de Processos',
      color: '#580707',
      teacher: 'Renata',
      objectId: '1',
    },
    {
      start: new Date('2024/03/05 20:50'),
      end: new Date('2024/03/05 22:30'),
      title: '54321.01 - Informatica Industrial',
      color: '#07581E',
      teacher: 'Luis',
      objectId: '2',
    },
  ]);
  const [manualEvents, setManualEvents] = useState<Partial<EventProps>[]>([
    {
      title: '98765.01 - Interface Web',
      color: '#251c72',
      teacher: 'Birchal',
      objectId: '3',
    },
  ]);

  return (
    <>
      <MainScreen.Container>
        <MainScreen.Title>
          <Typography fontWeight={700} color="primary">
            {t('schedule.TITLE')}
          </Typography>
          <Button
            style={{ borderRadius: '1.5rem' }}
            size="small"
            variant="contained"
          >
            {t('schedule.SAVE')}
          </Button>
        </MainScreen.Title>
        <MainScreen.Content>
          <ScheduleTable
            events={events}
            setEvents={setEvents}
            manualEvents={manualEvents}
            setManualEvents={setManualEvents}
            externalEvents={externalEvents}
            setExternalEvents={setExternalEvents}
          />
        </MainScreen.Content>
      </MainScreen.Container>
      {manualEvents && (
        <Disciplines
          manualEvents={manualEvents}
          externalEvents={externalEvents}
          setExternalEvents={setExternalEvents}
        />
      )}
    </>
  );
};

export default Chat;
