import React from 'react';
import {
  Calendar,
  Event,
  SlotInfo,
  dateFnsLocalizer,
} from 'react-big-calendar';
import withDragAndDrop, {
  DragFromOutsideItemArgs,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps, ScheduleTableProps } from '../Schedule.types';
import {
  CalendarContainer,
  EventItem,
  EventItemContent,
  RemoveEventButton,
} from '../Schedule.style';
import moment from 'moment';
import 'moment/locale/pt-br';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarTranlates } from '../Schedule.consts';
import CloseIcon from '@mui/icons-material/Close';
import { Themes } from '../../shared/Shared.consts';
import { Typography } from '@mui/material';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(Calendar);

const CustomHeader = (label: string) => {
  return (
    <Typography fontWeight={700} textTransform="capitalize">
      {label.split(' ')[1]}
    </Typography>
  );
};

const ScheduleTableTeacher: React.FC<ScheduleTableProps> = ({
  events,
  setEvents,
  manualEvents,
  setManualEvents,
  externalEvents,
  setExternalEvents,
}) => {
  const onEventDrop = (data: EventInteractionArgs<object>) => {
    const { start, end, event } = data;
    const newEvent = events.filter(
      (e) => JSON.stringify(e) !== JSON.stringify(data.event),
    );

    setEvents([
      ...newEvent,
      {
        ...(event as EventProps),
        start,
        end,
      },
    ]);
  };

  const onDropFromOutsideEvent = (data: DragFromOutsideItemArgs) => {
    const { start } = data;
    const hours = new Date(start).getHours();
    let endDate = new Date(start).setHours(hours + 1);
    setEvents((prev) => [
      ...prev,
      {
        ...externalEvents,
        start: new Date(start),
        end: new Date(endDate),
      } as EventProps,
    ]);

    setExternalEvents(null);

    const removedItem = [
      ...(manualEvents.find(
        ({ id }) => id === Number(externalEvents?.id?.split('-')[0]),
      )?.items ?? []),
    ];
    const clone = [...manualEvents];
    const index = clone.findIndex(
      ({ id }) => id === Number(externalEvents?.id?.split('-')[0]),
    );

    clone[index] = {
      ...clone[index],
      items: removedItem.filter(({ id }) => id !== externalEvents?.id),
    };
    setManualEvents(clone);
  };

  const eventStyleGetter = (event: Event) => {
    return {
      style: { backgroundColor: (event as EventProps).color },
    };
  };

  const rowEvent = {
    event: ({ event }: { event: Event }) => <CustomEventRow event={event} />,
  };

  const setTeacherScheduleds = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo;
    setEvents([
      ...events,
      {
        start,
        end,
        color: Themes.primary,
      },
    ]);
  };

  const CustomEventRow = ({ event }: { event: Event }) => {
    const removeEvent = (event: EventProps) => {
      setEvents((prev) =>
        prev.filter(
          (eventItem) => JSON.stringify(eventItem) !== JSON.stringify(event),
        ),
      );
    };

    const defaultStyle = { height: '1.2rem', width: '1.2rem' };

    return (
      <EventItem>
        <EventItemContent>{event.name}</EventItemContent>
        <RemoveEventButton onClick={() => removeEvent(event as EventProps)}>
          <CloseIcon
            color="secondary"
            style={{
              ...defaultStyle,
              position: 'absolute',
              top: '0',
              right: '0',
            }}
          />
        </RemoveEventButton>
      </EventItem>
    );
  };

  return (
    <CalendarContainer>
      <DnDCalendar
        defaultDate={moment().toDate()}
        messages={CalendarTranlates}
        defaultView={'week'}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        eventPropGetter={eventStyleGetter}
        resizable
        culture="pt-BR"
        onDropFromOutside={onDropFromOutsideEvent}
        components={{
          ...rowEvent,
          toolbar: () => null,
          header: ({ label }) => CustomHeader(label),
        }}
        views={['week']}
        step={10}
        timeslots={6}
        onSelectSlot={setTeacherScheduleds}
        selectable={true}
      />
    </CalendarContainer>
  );
};

export default ScheduleTableTeacher;
