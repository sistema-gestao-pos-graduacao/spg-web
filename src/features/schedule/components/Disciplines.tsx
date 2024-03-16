import React, { DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps } from '../Schedule.types';
import 'moment/locale/pt-br';
import { StateAction } from '../../shared/Shared.types';
import {
  DisciplineList,
  EventItem,
  EventItemContent,
  DisciplinesStyled as S,
} from '../Schedule.style';
import { MainScreen } from '../../shared/Shared.style';
import { Typography } from '@mui/material';
import { Themes } from '../../shared/Shared.consts';

const Disciplines: React.FC<{
  manualEvents: Partial<EventProps>[];
  externalEvents: Partial<EventProps> | null;
  setExternalEvents: StateAction<Partial<EventProps> | null>;
}> = ({ manualEvents, setExternalEvents }) => {
  const { t } = useTranslation();

  const SelectExternalEvent = (event: DragEvent<HTMLDivElement>) => {
    const customProp = event.currentTarget.dataset.event;
    setExternalEvents(JSON.parse(customProp as string));
  };

  return (
    <S.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color="primary">
          {t('schedule.MANUAL_DOCKING')}
        </Typography>
      </MainScreen.Title>
      <DisciplineList>
        {manualEvents.map((events) => (
          <EventItem
            key={events.objectId}
            data-event={JSON.stringify(events)}
            onDragStart={SelectExternalEvent}
            draggable
            style={{ backgroundColor: events.color, padding: '0 .4rem' }}
          >
            <EventItemContent>
              <Typography color={Themes.white}>{events.title}</Typography>
            </EventItemContent>
          </EventItem>
        ))}
      </DisciplineList>
    </S.Container>
  );
};

export default Disciplines;
