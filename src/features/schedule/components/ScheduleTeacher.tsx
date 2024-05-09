import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, CircularProgress, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EventProps } from '../Schedule.types';
import { ScheduledContent } from '../Schedule.style';
import { ContextProps, TeacherResponseProps } from '../../shared/Shared.types';
import { GlobalContext } from '../../shared/Context';
import { HttpMethods, Themes } from '../../shared/Shared.consts';
import useApi from '../../shared/useApi';
import { TEACHER_ROUTE } from '../../shared/RoutesURL';
import ScheduleTableTeacher from './ScheduleTableTeacher';
import moment from 'moment';

const ScheduleTeacher: React.FC = () => {
  const { t } = useTranslation();

  const { userLogged } = useContext<ContextProps>(GlobalContext);

  const [events, setEvents] = useState<EventProps[]>([]);

  const {
    data: teacherData,
    isLoading: teacherLoading,
    refetch: teacherRefetch,
  } = useApi<TeacherResponseProps[]>(
    `${TEACHER_ROUTE}?teacherId=${userLogged?.personId}`,
    HttpMethods.GET,
  );

  const filteredEvents = useMemo(
    () =>
      events
        ?.filter(
          ({ start, end }) =>
            !teacherData?.find(
              ({ startDateTime, endDateTime }) =>
                String(start) === String(new Date(startDateTime)) &&
                String(end) === String(new Date(endDateTime)),
            ),
        )
        .map((event) => ({
          ...event,
          startDateTime: moment(event.start).format('YYYY-MM-DDTHH:mm:ss'),
          endDateTime: moment(event.end).format('YYYY-MM-DDTHH:mm:ss'),
          teacherId: userLogged?.personId,
        })),
    [events],
  );

  const { isLoading: teacherPostLoading, refetch } = useApi(
    `${TEACHER_ROUTE}/SaveAll`,
    HttpMethods.POST,
    false,
    filteredEvents,
  );

  const deleteEvent = useMemo(
    () =>
      teacherData
        ?.filter(
          ({ startDateTime, endDateTime }) =>
            !events.find(
              ({ start, end }) =>
                String(start) === String(new Date(startDateTime)) &&
                String(end) === String(new Date(endDateTime)),
            ),
        )
        .map(({ id }) => id),
    [events],
  );

  const { isLoading: teacherDelLoading, refetch: deleteTeacher } = useApi(
    `${TEACHER_ROUTE}/DeleteAll`,
    HttpMethods.POST,
    false,
    deleteEvent,
  );

  useEffect(() => {
    teacherRefetch();
  }, []);

  useEffect(() => {
    if (!teacherPostLoading && !teacherDelLoading) {
      teacherRefetch();
    }
  }, [teacherPostLoading, teacherDelLoading]);

  useEffect(() => {
    setEvents(
      teacherData?.map(({ startDateTime, endDateTime }) => ({
        start: new Date(startDateTime),
        end: new Date(endDateTime),
        color: Themes.primary,
      })) ?? [],
    );
  }, [teacherData]);

  const saveHandler = () => {
    if (deleteEvent && deleteEvent.length > 0) deleteTeacher();
    if (filteredEvents.length > 0) refetch();
  };

  return (
    <ScheduledContent $isTeacher={true}>
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
          >
            {teacherPostLoading && (
              <CircularProgress size={'1rem'} color="secondary" />
            )}
            {t('schedule.SAVE')}
          </Button>
        </MainScreen.Title>
        <MainScreen.Content>
          {teacherLoading ? (
            <Skeleton
              width="100%"
              height="100%"
              variant="rectangular"
              sx={{ borderRadius: '1rem', animationDuration: '1.5s' }}
            />
          ) : (
            <ScheduleTableTeacher events={events} setEvents={setEvents} />
          )}
        </MainScreen.Content>
      </MainScreen.Container>
    </ScheduledContent>
  );
};

export default ScheduleTeacher;
