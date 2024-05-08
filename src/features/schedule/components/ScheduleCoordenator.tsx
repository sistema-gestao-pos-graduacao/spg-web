import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, CircularProgress, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EventProps, ManualEventsProps } from '../Schedule.types';
import Disciplines from './Disciplines';
import { ScheduledContent } from '../Schedule.style';
import {
  ScheduleResponseProps,
  SubjectsResponseProps,
} from '../../shared/Shared.types';
import { HttpMethods } from '../../shared/Shared.consts';
import useApi from '../../shared/useApi';
import { SCHEDULE_ROUTE, SUBJECTS_ROUTE } from '../../shared/RoutesURL';
import ScheduleTableCoordenator from './ScheduleTableCoordenator';
import moment from 'moment';
import FilterField from '../../shared/components/FilterField';

const ScheduleCoordenator: React.FC = () => {
  const { t } = useTranslation();

  const [externalEvents, setExternalEvents] =
    useState<Partial<EventProps> | null>(null);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [manualEvents, setManualEvents] = useState<ManualEventsProps[]>([]);
  const [filteredTeacher, setFilteredTeacher] = useState<number[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<number[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<number[]>([]);

  const queryFilter = useCallback(
    (route: string, isClass?: boolean) => {
      if (
        filteredSubjects.length > 0 ||
        filteredTeacher.length > 0 ||
        filteredClasses.length > 0
      ) {
        const subjectFilter =
          filteredSubjects.length > 0
            ? `${isClass ? 'subjectId' : 'id'}=${filteredSubjects.join('&id=')}`
            : '';
        const classesFilter =
          filteredClasses.length > 0
            ? `id=${filteredClasses.join('&id=')}`
            : '';
        const teacherFilter =
          filteredTeacher.length > 0
            ? `teacherId=${filteredTeacher.join('&id=')}`
            : '';
        const filters = [subjectFilter, classesFilter, teacherFilter]
          .filter(Boolean)
          .join('&');
        const queryParams = filters ? `?${filters}` : '';
        return `${route}${queryParams}`;
      }
      return route;
    },
    [filteredSubjects, filteredTeacher, filteredClasses],
  );

  const {
    data: disciplinesData,
    isLoading,
    refetch: disciplineRefetch,
  } = useApi<SubjectsResponseProps[]>(
    queryFilter(SUBJECTS_ROUTE),
    HttpMethods.GET,
    false,
  );

  const {
    data: scheduleGetData,
    isLoading: scheduleGetLoading,
    refetch: scheduleGetRefetch,
  } = useApi<ScheduleResponseProps[]>(
    queryFilter(SCHEDULE_ROUTE, true),
    HttpMethods.GET,
  );

  const deleteItems = useMemo(
    () =>
      scheduleGetData
        ?.filter(
          (item) =>
            !events?.find(
              (event) =>
                item.id === Number(event.id?.split('-')[2]) &&
                item.startDateTime ===
                  moment(event.start).format('YYYY-MM-DDTHH:mm:ss') &&
                item.endDateTime ===
                  moment(event.end).format('YYYY-MM-DDTHH:mm:ss'),
            ),
        )
        .map(({ id }) => id),
    [events],
  );

  const { isLoading: deleteLoading, refetch: deleteRefetch } = useApi(
    `${SCHEDULE_ROUTE}/DeleteAll`,
    HttpMethods.POST,
    false,
    deleteItems,
  );

  const saveItems = useMemo(
    () =>
      events
        .filter(
          (event) =>
            !scheduleGetData?.find(
              (item) =>
                item.id === Number(event.id?.split('-')[2]) &&
                item.startDateTime ===
                  moment(event.start).format('YYYY-MM-DDTHH:mm:ss') &&
                item.endDateTime ===
                  moment(event.end).format('YYYY-MM-DDTHH:mm:ss'),
            ),
        )
        .map((event) => ({
          subjectId: Number(event.id?.split('-')[0]),
          startDateTime: moment(event.start).format('YYYY-MM-DDTHH:mm:ss'),
          endDateTime: moment(event.end).format('YYYY-MM-DDTHH:mm:ss'),
          color: event.color,
        })),
    [events],
  );

  const { isLoading: scheduleLoading, refetch: scheduleRefetch } = useApi(
    `${SCHEDULE_ROUTE}/SaveAll`,
    HttpMethods.POST,
    false,
    saveItems,
  );

  useEffect(() => {
    disciplineRefetch();
  }, [filteredSubjects, filteredTeacher, filteredClasses]);

  useEffect(() => {
    if (!scheduleLoading && !deleteLoading) {
      scheduleGetRefetch();
    }
  }, [
    scheduleLoading,
    deleteLoading,
    filteredSubjects,
    filteredTeacher,
    filteredClasses,
  ]);

  const scheduledItems = useMemo(
    () =>
      scheduleGetData?.map((item) => {
        const referenceItem = disciplinesData?.find(
          ({ id }) => id === item.subjectId,
        )!;
        return {
          ...referenceItem,
          hours: 1,
          id: `${referenceItem!.id}-${Math.random()}-${item.id}`,
          start: new Date(item.startDateTime),
          end: new Date(item.endDateTime),
        };
      }) ?? [],
    [scheduleGetData],
  );

  useEffect(() => {
    setManualEvents(
      disciplinesData?.map((events) => {
        const count = scheduledItems.filter(
          ({ id }) => Number(id.split('-')[0]) === events.id,
        ).length;
        const arr = Array(events.hours - count).fill('');
        return {
          title: events.name,
          id: events.id,
          items: arr.map(() => ({
            ...events,
            hours: 1,
            id: `${events.id}-${Math.random()}`,
          })),
        };
      }) ?? [],
    );
  }, [scheduledItems]);

  useEffect(() => {
    setEvents(scheduledItems);
  }, [scheduleGetData]);

  const saveHandler = () => {
    if (saveItems.length > 0) scheduleRefetch();
    if (deleteItems && deleteItems.length > 0) deleteRefetch();
  };

  return (
    <ScheduledContent $isTeacher={false}>
      <MainScreen.Container>
        <MainScreen.Title>
          <Typography fontWeight={700} color="primary">
            {t('schedule.TITLE')}
          </Typography>
          <Button
            style={{ borderRadius: '1.5rem', gap: '.5rem' }}
            size="small"
            variant="contained"
            onClick={saveHandler}
            disabled={deleteItems?.length === 0 && saveItems.length === 0}
          >
            {(scheduleLoading || deleteLoading) && (
              <CircularProgress size={'1rem'} color="secondary" />
            )}
            {t('schedule.SAVE')}
          </Button>
        </MainScreen.Title>
        <FilterField
          classScreen
          filteredTeacher={filteredTeacher}
          setFilteredTeacher={setFilteredTeacher}
          filteredSubjects={filteredSubjects}
          setFilteredSubjects={setFilteredSubjects}
          filteredClasses={filteredClasses}
          setFilteredClasses={setFilteredClasses}
        />
        <MainScreen.Content>
          {isLoading || scheduleGetLoading ? (
            <Skeleton
              width="100%"
              height="100%"
              variant="rectangular"
              sx={{ borderRadius: '1rem', animationDuration: '1.5s' }}
            />
          ) : (
            <ScheduleTableCoordenator
              events={events}
              setEvents={setEvents}
              manualEvents={manualEvents}
              setManualEvents={setManualEvents}
              externalEvents={externalEvents}
              setExternalEvents={setExternalEvents}
            />
          )}
        </MainScreen.Content>
      </MainScreen.Container>
      <Disciplines
        manualEvents={manualEvents.filter(({ items }) => items.length > 0)}
        externalEvents={externalEvents}
        setExternalEvents={setExternalEvents}
        isLoading={isLoading || scheduleGetLoading}
      />
    </ScheduledContent>
  );
};

export default ScheduleCoordenator;
