import React, { DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ManualEventsProps } from '../Schedule.types';
import 'moment/locale/pt-br';
import { StateAction } from '../../shared/Shared.types';
import {
  DisciplineList,
  DisciplineListHeader,
  EventItem,
  EventItemContent,
  DisciplinesStyled as S,
} from '../Schedule.style';
import { MainScreen } from '../../shared/Shared.style';
import { Skeleton, Typography } from '@mui/material';
import { Themes } from '../../shared/Shared.consts';

const Disciplines: React.FC<{
  manualEvents: ManualEventsProps[];
  externalEvents: Partial<ManualEventsProps> | null;
  setExternalEvents: StateAction<Partial<ManualEventsProps> | null>;
  isLoading?: boolean;
}> = ({ manualEvents, setExternalEvents, isLoading }) => {
  const { t } = useTranslation();

  const SelectExternalEvent = (event: DragEvent<HTMLDivElement>) => {
    const customProp = event.currentTarget.dataset.event;
    setExternalEvents(JSON.parse(customProp as string));
  };

  return (
    <S.Container>
      <MainScreen.Title style={{ minHeight: '2.5rem' }}>
        <Typography fontWeight={700} color="primary">
          {t('schedule.MANUAL_DOCKING')}
        </Typography>
      </MainScreen.Title>
      <DisciplineListHeader>
        <Typography fontWeight={700} color="primary">
          {t('schedule.DISCIPLINES')}
        </Typography>
        <Typography fontWeight={700} color="primary">
          {t('schedule.CLASS')}
        </Typography>
      </DisciplineListHeader>
      {isLoading ? (
        <Skeleton
          width="100%"
          height="100%"
          variant="rectangular"
          sx={{ animationDuration: '1.5s', borderRadius: '1rem' }}
        />
      ) : (
        <DisciplineList>
          {manualEvents.map((events) => (
            <EventItem
              key={events.id}
              data-event={JSON.stringify(events)}
              onDragStart={SelectExternalEvent}
              draggable
              style={{
                backgroundColor: events.color,
                padding: '0 .4rem',
              }}
            >
              <EventItemContent>
                <Typography
                  textOverflow="ellipsis"
                  overflow="hidden"
                  color={Themes.white}
                >
                  {events.name}
                </Typography>
              </EventItemContent>
              <Typography
                textOverflow="ellipsis"
                overflow="hidden"
                color={Themes.white}
              >
                {events.classNumber}
              </Typography>
            </EventItem>
          ))}
        </DisciplineList>
      )}
    </S.Container>
  );
};

export default Disciplines;
