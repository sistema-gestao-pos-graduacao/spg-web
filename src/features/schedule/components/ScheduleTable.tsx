import React, { useState } from 'react';
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
import {
  EventProps,
  ManualEventsProps,
  ScheduleTableProps,
} from './../Schedule.types';
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
import CloseIcon from '@mui/icons-material/Close';
import { Roles, Themes } from '../../shared/Shared.consts';
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

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  events,
  setEvents,
  manualEvents,
  setManualEvents,
  externalEvents,
  setExternalEvents,
  visionMode,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventProps | null>(null);

  const isTecherMode = visionMode === Roles.TEACHER;

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
        ({ title }) => title === externalEvents?.title?.split('- ')[1],
      )?.items ?? []),
    ];
    const clone = [...manualEvents];
    const index = clone.findIndex(
      ({ title }) => title === externalEvents?.title?.split('- ')[1],
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
    const SelectEvent = (event: Event) => {
      setCurrentEvent(event as EventProps);
      setOpenModal(true);
    };
    const removeEvent = (event: EventProps) => {
      const { title, id } = event;

      const index = manualEvents.findIndex(
        ({ title: eventTitle }) => eventTitle === title?.split('- ')[1],
      );

      const clone = [...manualEvents];
      clone[index].items.push(event);

      setManualEvents(clone);
      setEvents((prev) => prev.filter(({ id: eventsId }) => eventsId !== id));
    };

    const defaultStyle = { height: '1.2rem', width: '1.2rem' };

    return (
      <EventItem>
        <EventItemContent onClick={() => SelectEvent(event)}>
          {event.title}
        </EventItemContent>
        <RemoveEventButton onClick={() => removeEvent(event as EventProps)}>
          <CloseIcon
            color="secondary"
            style={
              isTecherMode
                ? {
                    ...defaultStyle,
                    position: 'absolute',
                    top: '0',
                    right: '0',
                  }
                : defaultStyle
            }
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
        defaultView={isTecherMode ? 'week' : 'month'}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        eventPropGetter={eventStyleGetter}
        resizable
        culture="pt-BR"
        onDropFromOutside={onDropFromOutsideEvent}
        components={
          isTecherMode
            ? {
                ...rowEvent,
                toolbar: () => null,
                header: ({ label }) => CustomHeader(label),
              }
            : rowEvent
        }
        views={isTecherMode ? ['week'] : ['month', 'day', 'agenda']}
        step={10}
        timeslots={6}
        onSelectSlot={setTeacherScheduleds}
        selectable={isTecherMode}
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
