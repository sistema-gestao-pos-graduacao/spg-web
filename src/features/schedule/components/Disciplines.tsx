import React, { DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps, ManualEventsProps } from '../Schedule.types';
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
import AccordionComponent from '../../shared/components/Accordion';

const Disciplines: React.FC<{
  manualEvents: ManualEventsProps[];
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
        {manualEvents.map(({ items, title }) => (
          <React.Fragment key={title}>
            <AccordionComponent
              label={title}
              listItens={
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.2rem',
                  }}
                >
                  {items.map((events) => (
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
                        <Typography color={Themes.white}>
                          {events.title}
                        </Typography>
                      </EventItemContent>
                    </EventItem>
                  ))}
                </div>
              }
            />
          </React.Fragment>
        ))}
      </DisciplineList>
    </S.Container>
  );
};

export default Disciplines;
