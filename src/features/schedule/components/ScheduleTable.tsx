import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Event, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventProps } from './../Schedule.types';
import ScheduleModal from './ScheduleModal';
import { CalendarContainer } from './../Schedule.style';
import moment from 'moment';
import 'moment/locale/pt-br';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarTranlates } from '../Schedule.consts';

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

const ScheduleTable: React.FC = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventProps | null>(null);
  const [events, setEvents] = useState<EventProps[]>([
    {
      start: new Date('2024/03/04 17:10'),
      end: new Date('2024/03/04 18:50'),
      title: '12345.01 - Controle de Processos',
      color: '#580707',
      teacher: 'Renata',
    },
    {
      start: new Date('2024/03/05 20:50'),
      end: new Date('2024/03/05 22:30'),
      title: '54321.01 - Informatica Industrial',
      color: '#07581E',
      teacher: 'Luis',
    },
  ]);

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

  const eventStyleGetter = (event: Event) => {
    return {
      style: { backgroundColor: (event as EventProps).color },
    };
  };

  const SelectEvent = (event: Event) => {
    setCurrentEvent(event as EventProps);
    setOpenModal(true);
  };

  return (
    <CalendarContainer>
      <DnDCalendar
        defaultDate={moment().toDate()}
        messages={CalendarTranlates}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        resizable
        eventPropGetter={eventStyleGetter}
        onSelectEvent={SelectEvent}
        selectable
        culture="pt-BR"
      />
      <ScheduleModal
        open={openModal}
        setOpen={setOpenModal}
        currentEvent={currentEvent}
      />
    </CalendarContainer>
  );
};

export default ScheduleTable;
