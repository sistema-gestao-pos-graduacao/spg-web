import React, { useState } from 'react';
import { Calendar, Event, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  DragFromOutsideItemArgs,
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps } from './../Schedule.types';
import ScheduleModal from './ScheduleModal';
import {
  CalendarContainer,
  EventItem,
  EventItemContent,
  RemoveEventButton,
} from './../Schedule.style';
import moment from 'moment';
import 'moment/locale/pt-br';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarTranlates } from '../Schedule.consts';
import { StateAction } from '../../shared/Shared.types';
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

const ScheduleTable: React.FC<{
  events: EventProps[];
  setEvents: StateAction<EventProps[]>;
  manualEvents: Partial<EventProps>[];
  setManualEvents: StateAction<Partial<EventProps>[]>;
  externalEvents: Partial<EventProps> | null;
  setExternalEvents: StateAction<Partial<EventProps> | null>;
}> = ({
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

  const SelectEvent = (event: Event) => {
    setCurrentEvent(event as EventProps);
    setOpenModal(true);
  };

  const onDropFromOutsideEvent = (data: DragFromOutsideItemArgs) => {
    const { start } = data;
    const hours = new Date(start).getHours();
    const min = new Date(start).getMinutes();

    let endDate = new Date(start).setHours(hours + 2);
    endDate = new Date(endDate).setMinutes(min - 20);

    setEvents((prev) => [
      ...prev,
      {
        ...externalEvents,
        start: new Date(start),
        end: new Date(endDate),
      } as EventProps,
    ]);
    setExternalEvents(null);
    setManualEvents(
      manualEvents.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(externalEvents),
      ),
    );
  };

  const removeEvent = (event: EventProps) => {
    const { color, title, teacher } = event;

    setManualEvents((prev) => [...prev, { color, title, teacher }]);
    setEvents((prev) =>
      prev.filter((e) => JSON.stringify(e) !== JSON.stringify(event)),
    );
  };

  const eventStyleGetter = (event: Event) => {
    return {
      style: { backgroundColor: (event as EventProps).color },
    };
  };

  const CustomEventRow = ({ event }: { event: Event }) => (
    <EventItem>
      <EventItemContent onClick={() => SelectEvent(event)}>
        {event.title}
      </EventItemContent>
      <RemoveEventButton onClick={() => removeEvent(event as EventProps)}>
        <CloseIcon
          color="action"
          style={{ height: '1.2rem', width: '1.2rem' }}
        />
      </RemoveEventButton>
    </EventItem>
  );

  return (
    <CalendarContainer>
      <DnDCalendar
        defaultDate={moment().toDate()}
        messages={CalendarTranlates}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        eventPropGetter={eventStyleGetter}
        resizable
        culture="pt-BR"
        onDropFromOutside={onDropFromOutsideEvent}
        components={{
          event: ({ event }) => <CustomEventRow event={event} />,
        }}
        views={['month', 'day', 'agenda']}
        step={10}
        timeslots={6}
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

export default ScheduleTable;
