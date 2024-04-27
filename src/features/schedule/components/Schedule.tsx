import React, { useContext, useEffect, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ScheduleTable from './ScheduleTable';
import { EventProps, ManualEventsProps } from '../Schedule.types';
import Disciplines from './Disciplines';
import { ScheduledContent } from '../Schedule.style';
import { ContextProps } from '../../shared/Shared.types';
import { GlobalContext } from '../../shared/Context';
import { Roles } from '../../shared/Shared.consts';

const Chat: React.FC = () => {
  const { t } = useTranslation();

  const { visionMode } = useContext<ContextProps>(GlobalContext);

  const [externalEvents, setExternalEvents] =
    useState<Partial<EventProps> | null>(null);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [manualEvents, setManualEvents] = useState<ManualEventsProps[]>([]);
  const mockManuelEvents = [
    {
      title: '98765.01 - Interface Web',
      color: '#251c72',
      teacher: 'Birchal',
      workload: 16,
      id: '3',
    },
    {
      title: '54321.01 - Informatica Industrial',
      color: '#580707',
      teacher: 'Renata',
      workload: 5,
      id: '4',
    },
  ];

  useEffect(() => {
    setManualEvents(
      mockManuelEvents.map((events) => {
        const arr = Array(events.workload).fill('');
        return {
          title: events.title?.split('- ')[1] ?? '',
          items: arr.map((_, index) => ({
            ...events,
            workload: 1,
            id: index,
          })),
        };
      }),
    );
  }, []);

  return (
    <ScheduledContent $isTeacher={visionMode === Roles.TEACHER}>
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
            visionMode={visionMode}
          />
        </MainScreen.Content>
      </MainScreen.Container>
      {visionMode !== Roles.TEACHER && (
        <Disciplines
          manualEvents={manualEvents}
          externalEvents={externalEvents}
          setExternalEvents={setExternalEvents}
        />
      )}
    </ScheduledContent>
  );
};

export default Chat;
