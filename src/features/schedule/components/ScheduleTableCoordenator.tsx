import React, { useEffect, useState } from 'react';
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
  ToastWarning,
} from '../Schedule.style';
import moment from 'moment';
import 'moment/locale/pt-br';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CalendarTranlates,
  EndDate,
  NightHour,
  StarDate,
} from '../Schedule.consts';
import CloseIcon from '@mui/icons-material/Close';
import useApi from '../../shared/useApi';
import { AvailableResponseProps } from '../../shared/Shared.types';
import { TEACHER_ROUTE } from '../../shared/RoutesURL';
import { HttpMethods } from '../../shared/Shared.consts';
import { Grow, Snackbar, Typography } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<EventProps | null>(null);
  const [currentView, setCurrentView] = useState<string>('month');
  const [warningView, setWarningView] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const { data: availableData } = useApi<AvailableResponseProps[]>(
    `${TEACHER_ROUTE}?teacherId=${externalEvents?.teacherId}`,
    HttpMethods.GET,
    !!externalEvents,
  );

  const checkIncludedDate = (date: Date) => {
    return !!availableData?.find(({ startDateTime, endDateTime }) => {
      const startTime = new Date(startDateTime);
      const endTime = new Date(endDateTime);

      const startTotalMinutes =
        startTime.getHours() * 60 + startTime.getMinutes();
      const endTotalMinutes = endTime.getHours() * 60 + endTime.getMinutes();
      const dateTotalMinutes = date.getHours() * 60 + date.getMinutes();
      const isSameDayOfWeek = date.getDay() === startTime.getDay();
      return (
        isSameDayOfWeek &&
        startTotalMinutes <= dateTotalMinutes &&
        dateTotalMinutes < endTotalMinutes
      );
    });
  };

  const checkIncludedDateMonth = (date: Date) => {
    return !!availableData?.find(({ startDateTime }) => {
      const dateTime = new Date(startDateTime);
      return dateTime.getDay() === date.getDay();
    });
  };

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
    if (!!availableData?.length) {
      const formatEndDate = (end: Date) => {
        const endDate = new Date(end);
        return new Date(endDate.setMinutes(end.getMinutes() - 10));
      };

      const showWarning =
        currentView === 'month'
          ? checkIncludedDateMonth(start as Date)
          : checkIncludedDate(start as Date) &&
            checkIncludedDate(formatEndDate(end as Date));

      setWarningView(!showWarning);
    }
    setClick(false);
    setExternalEvents(null);
  };

  const onDropFromOutsideEvent = (data: DragFromOutsideItemArgs) => {
    const { start } = data;

    const startDate = !!new Date(start).getHours()
      ? new Date(start)
      : new Date(start).setHours(NightHour);

    let endDate = new Date(startDate).setMinutes(
      new Date(startDate).getMinutes() + 100,
    );
    setEvents((prev) => [
      ...prev,
      {
        ...externalEvents,
        id: `${externalEvents?.id}-${Math.random()}`,
        start: new Date(startDate),
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
    return (
      <EventItem>
        <EventItemContent
          onMouseUp={() => {
            setClick(false);
          }}
          onMouseDown={(click) => {
            setCurrentEvent(event as EventProps);
            setTimer(0);
            setClick(true);
            click.isPropagationStopped();
          }}
        >
          {event.title}
        </EventItemContent>
        <RemoveEventButton onClick={() => removeEvent(event as EventProps)}>
          <CloseIcon
            color="secondary"
            style={{ height: '1.2rem', width: '1.2rem' }}
          />
        </RemoveEventButton>
      </EventItem>
    );
  };

  const getDayProp = (date: Date) => {
    if (currentView === 'month' && checkIncludedDateMonth(date))
      return {
        style: {
          backgroundColor: '#d7ffb3',
        },
      };
    return {};
  };

  const getSlotProp = (date: Date) => {
    if (checkIncludedDate(date))
      return {
        style: {
          backgroundColor: '#d7ffb3',
          borderColor: '#d7ffb3',
        },
      };
    return {};
  };

  useEffect(() => {
    if (click) {
      setTimer((prev) => prev + 1);
      if (timer > 15) {
        setExternalEvents({ ...currentEvent, id: Number(currentEvent?.id) });
      }
    } else {
      if (timer !== 0 && timer <= 15) {
        setOpenModal(true);
      }
      setExternalEvents(null);
    }
    if (openModal) {
      setClick(false);
      setTimer(0);
    }
  }, [click, timer, openModal]);

  return (
    <CalendarContainer>
      <DnDCalendar
        defaultDate={moment().utcOffset('-03:00').toDate()}
        messages={CalendarTranlates}
        defaultView={'month'}
        events={events}
        localizer={localizer}
        onDragStart={({ event }) => {
          if (currentView === 'day') setExternalEvents(event);
        }}
        onEventDrop={onEventDrop}
        eventPropGetter={eventStyleGetter}
        resizable
        culture="pt-BR"
        onDropFromOutside={onDropFromOutsideEvent}
        components={rowEvent}
        dayPropGetter={getDayProp}
        slotPropGetter={getSlotProp}
        views={['month', 'day', 'agenda']}
        step={10}
        timeslots={6}
        selectable={false}
        min={StarDate}
        max={EndDate}
        onView={setCurrentView}
      />
      {currentEvent && (
        <ScheduleModal
          open={openModal}
          setOpen={setOpenModal}
          currentEvent={currentEvent}
        />
      )}
      <Snackbar
        open={warningView}
        autoHideDuration={3e3}
        onClose={() => {
          setWarningView(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Grow}
      >
        <ToastWarning>
          <Warning color="secondary" />
          <Typography fontSize=".9rem" color="secondary">
            {t('schedule.WARNING_CLASS_SCHEDULE')}
          </Typography>
        </ToastWarning>
      </Snackbar>
    </CalendarContainer>
  );
};

export default ScheduleTableCoordenator;
