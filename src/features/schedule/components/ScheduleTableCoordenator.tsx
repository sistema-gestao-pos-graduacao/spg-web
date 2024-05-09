import React, { useState } from 'react';
import { Calendar, Event, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  DragFromOutsideItemArgs,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps, ScheduleTableCoordenatorProps } from '../Schedule.types';
import ScheduleModal from './ScheduleModal';
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

const ScheduleTableCoordenator: React.FC<ScheduleTableCoordenatorProps> = ({
  events,
  setEvents,
  manualEvents,
  setManualEvents,
  externalEvents,
  setExternalEvents,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventProps | null>(null);

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
        id: `${externalEvents?.id}-${Math.random()}`,
        start: new Date(start),
        end: new Date(endDate),
      } as EventProps,
    ]);

    setExternalEvents(null);

    const clone = [...manualEvents];
    const index = clone.findIndex(({ id }) => id === externalEvents?.id);

    clone[index].classNumber -= 1;
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

  const CustomEventRow = ({ event }: { event: Event }) => {
    const SelectEvent = (event: Event) => {
      setCurrentEvent(event as EventProps);
      setOpenModal(true);
    };
    const removeEvent = (event: EventProps) => {
      const { id } = event;
      const index = manualEvents.findIndex(
        ({ id: eventId }) => eventId === Number(id?.split('-')[0]),
      );
      const clone = [...manualEvents];
      clone[index].classNumber += 1;

      setManualEvents(clone);
      setEvents((prev) => prev.filter(({ id: eventsId }) => eventsId !== id));
    };

    const defaultStyle = { height: '1.2rem', width: '1.2rem' };

    return (
      <EventItem>
        <EventItemContent onClick={() => SelectEvent(event)}>
          {event.name}
        </EventItemContent>
        <RemoveEventButton onClick={() => removeEvent(event as EventProps)}>
          <CloseIcon color="secondary" style={defaultStyle} />
        </RemoveEventButton>
      </EventItem>
    );
  };

  return (
    <CalendarContainer>
      <DnDCalendar
        defaultDate={moment().utcOffset('-03:00').toDate()}
        messages={CalendarTranlates}
        defaultView={'month'}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        eventPropGetter={eventStyleGetter}
        resizable
        culture="pt-BR"
        onDropFromOutside={onDropFromOutsideEvent}
        components={rowEvent}
        views={['month', 'day', 'agenda']}
        step={10}
        timeslots={6}
        selectable={false}
      />
      {currentEvent && (
        <ScheduleModal
          open={openModal}
          setOpen={setOpenModal}
          currentEvent={currentEvent}
        />
      )}
    </CalendarContainer>
  );
};

export default ScheduleTableCoordenator;
