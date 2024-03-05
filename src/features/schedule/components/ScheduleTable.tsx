import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Calendar, Event, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps } from './../Schedule.types';
import ScheduleModal from './ScheduleModal';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const ScheduleTable: React.FC = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventProps | null>(null);
  const [events, setEvents] = useState<EventProps[]>([
    {
      start: new Date('2024/03/10'),
      end: new Date('2024/03/10'),
      title: '12345.01 - Controle de Processos',
      color: '#580707',
      selectable: true,
    },
    {
      start: new Date('2024/03/04'),
      end: new Date('2024/03/04'),
      title: '54321.01 - Informatica Industrial',
      color: '#07581E',
      selectable: true,
    },
  ]);

  const onEventResize = (data: EventInteractionArgs<object>) => {
    console.log(data);
  };

  const onEventDrop = (data: EventInteractionArgs<object>) => {
    const { start, end, event } = data;
    console.log('data: ', data);

    const newEvent = events.filter(
      (e) => JSON.stringify(e) !== JSON.stringify(data.event),
    );

    setEvents([
      ...newEvent,
      {
        start,
        end,
        title: (event as EventProps).title,
        color: (event as EventProps).color,
        selectable: true,
      },
    ]);
  };

  const eventStyleGetter = (event: Event) => {
    return {
      style: { backgroundColor: (event as EventProps).color },
    };
  };

  const SelectEvent = (event: Event) => {
    console.log('dawdwadwdwad');
    setCurrentEvent(event as EventProps);
    setOpenModal(true);
  };

  return (
    <div style={{ height: '100%', width: '100%', padding: '0 1rem 1rem 0' }}>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        eventPropGetter={eventStyleGetter}
        onSelectEvent={SelectEvent}
      />
      <ScheduleModal
        open={openModal}
        setOpen={setOpenModal}
        currentEvent={currentEvent}
      />
    </div>
  );
};

export default ScheduleTable;
