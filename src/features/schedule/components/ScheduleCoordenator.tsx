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
import ExportToPDF from './ExportPDF';
import { NoContent } from '../../disciplines/Disciplines.style';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const ScheduleCoordenator: React.FC = () => {
  const { t } = useTranslation();

  const [externalEvents, setExternalEvents] =
    useState<Partial<ManualEventsProps> | null>(null);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [manualEvents, setManualEvents] = useState<ManualEventsProps[]>([]);
  const [filteredTeacher, setFilteredTeacher] = useState<number[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<number[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<number[]>([]);

  const [curriculumId, setCurriculumId] = useState<number[]>([]);

  const queryFilterSubject = useCallback(
    (route: string) => {
      const hasFilters =
        filteredSubjects.length > 0 ||
        filteredTeacher.length > 0 ||
        filteredClasses.length > 0;

      let filters = '';

      if (hasFilters) {
        const subjectFilter =
          filteredSubjects.length > 0
            ? `id=list(${filteredSubjects.join()})`
            : '';
        const classesFilter =
          curriculumId.length > 0
            ? `curriculumId=list(${Array.from(new Set(curriculumId)).join()})`
            : '';
        const teacherFilter =
          filteredTeacher.length > 0
            ? `teacherId=list(${filteredTeacher.join()})`
            : '';

        filters = [subjectFilter, classesFilter, teacherFilter]
          .filter(Boolean)
          .join('&');
      }

      const queryParams = filters ? `?${filters}` : '';
      return `${route}${queryParams}`;
    },
    [filteredSubjects, filteredTeacher, filteredClasses, curriculumId],
  );
  const queryFilterClass = useCallback(
    (route: string) => {
      const hasFilters =
        filteredSubjects.length > 0 ||
        filteredTeacher.length > 0 ||
        filteredClasses.length > 0;

      let filters = '';

      if (hasFilters) {
        const subjectFilter =
          filteredSubjects.length > 0
            ? `subjectId=list(${filteredSubjects.join()})`
            : '';

        const teacherFilter =
          filteredTeacher.length > 0
            ? `teacherId=list(${filteredTeacher.join()})`
            : '';

        filters = [subjectFilter, teacherFilter].filter(Boolean).join('&');
      }

      const queryParams = filters ? `?${filters}` : '';
      return `${route}${queryParams}`;
    },
    [filteredSubjects, filteredTeacher, filteredClasses, curriculumId],
  );

  const { data: disciplinesData, isLoading } = useApi<SubjectsResponseProps[]>(
    queryFilterSubject(SUBJECTS_ROUTE),
    HttpMethods.GET,
  );

  const {
    data: scheduleGetData,
    isLoading: scheduleGetLoading,
    refetch: scheduleGetRefetch,
  } = useApi<ScheduleResponseProps[]>(
    queryFilterClass(
      `${SCHEDULE_ROUTE}/filteredByClass/${filteredClasses[0] ?? 0}`,
    ),
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
          relatedClassesIds: filteredClasses,
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
          title: item.subjectName,
          id: `${referenceItem.id}-${Math.random()}-${item.id}`,
          start: new Date(item.startDateTime),
          end: new Date(item.endDateTime),
        };
      }) ?? [],
    [scheduleGetData, disciplinesData],
  );

  useEffect(() => {
    setManualEvents(
      disciplinesData?.map((events) => {
        const count = scheduledItems.filter(
          ({ id }) => Number(id.split('-')[0]) === events.id,
        ).length;
        return {
          ...events,
          classNumber: events.numberOfClasses - count,
          title: events.name,
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
          <ExportToPDF scheduleData={scheduleGetData ?? []} />
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
          scheduleScreen
          filteredTeacher={filteredTeacher}
          setFilteredTeacher={setFilteredTeacher}
          filteredSubjects={filteredSubjects}
          setFilteredSubjects={setFilteredSubjects}
          filteredClasses={filteredClasses}
          setFilteredClasses={setFilteredClasses}
          setCurriculumId={setCurriculumId}
        />
        {filteredClasses.length > 0 ? (
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
                filteredTeacher={filteredTeacher}
              />
            )}
          </MainScreen.Content>
        ) : (
          <NoContent>
            <FactCheckIcon
              sx={{ width: '3rem', height: '3rem' }}
              color="primary"
            />
            <Typography fontSize="1.2rem" fontWeight={700} color="primary">
              {t('schedule.SELECT_CLASS')}
            </Typography>
          </NoContent>
        )}
      </MainScreen.Container>
      {
        <Disciplines
          manualEvents={
            filteredClasses.length > 0
              ? manualEvents.filter(({ classNumber }) => classNumber > 0)
              : []
          }
          externalEvents={externalEvents}
          setExternalEvents={setExternalEvents}
          isLoading={isLoading || scheduleGetLoading}
        />
      }
    </ScheduledContent>
  );
};

export default ScheduleCoordenator;
