import React, { useEffect, useMemo, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, CircularProgress, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HttpMethods, Themes } from '../../shared/Shared.consts';
import { DisciplinesDetails as S } from '../Disciplines.style';
import { useForm } from 'react-hook-form';
import { Cancel, Edit, Save } from '@mui/icons-material';
import DisciplinesInfos from './DisciplinesInfos';
import DisciplinesStudents from './DisciplinesStudents';
import DisciplinesProgram from './DisciplinesProgram';
import { SubjectsResponseProps } from '../../shared/Shared.types';
import { SUBJECTS_ROUTE } from '../../shared/RoutesURL';
import { useLocation } from 'react-router-dom';
import useApi from '../../shared/useApi';
import { DisciplineForm } from '../Disciplines.types';

const DisciplinesDetails: React.FC = () => {
  const { t } = useTranslation();
  const [possibleEdit, setPossibleEdit] = useState<boolean>(false);
  const form = useForm<DisciplineForm>();
  const { reset, watch } = form;
  const location = useLocation();
  const subjectId = location.pathname.split('/')[2];

  const {
    data: disciplineData,
    isLoading: disciplineLoading,
    refetch: disciplineRefetch,
  } = useApi<SubjectsResponseProps>(
    `${SUBJECTS_ROUTE}/${subjectId}`,
    HttpMethods.GET,
  );

  const { isLoading, refetch, isSuccess } = useApi<SubjectsResponseProps>(
    SUBJECTS_ROUTE,
    HttpMethods.PUT,
    false,
    {
      ...watch(),
      students: watch('students')?.split(', '),
    },
  );

  useEffect(() => {
    if (disciplineData)
      reset({
        ...disciplineData,
        students: (disciplineData.students ?? []).join(', '),
      });
  }, [disciplineData]);

  useEffect(() => {
    if (isSuccess) {
      disciplineRefetch();
      setPossibleEdit(false);
    }
  }, [isSuccess]);

  const formData = useMemo(
    () => [
      {
        label: t('disciplines.TEACHER'),
        edited: false,
        key: 'teacherName',
        type: 'text',
      },
      {
        label: t('disciplines.MATRIX'),
        edited: false,
        key: 'curriculumName',
        type: 'text',
      },
      {
        label: t('disciplines.DISCIPLINE'),
        edited: false,
        key: 'name',
        type: 'text',
      },
      {
        label: t('disciplines.HOURS'),
        edited: false,
        key: 'hours',
        type: 'text',
      },
      {
        label: t('disciplines.LOCATION'),
        edited: true,
        key: 'location',
        type: 'text',
      },
      {
        label: t('disciplines.BUILDING'),
        edited: true,
        key: 'building',
        type: 'number',
      },
      {
        label: t('disciplines.ROOM'),
        edited: true,
        key: 'room',
        type: 'number',
      },
    ],
    [],
  );

  const onSubmit = () => {
    refetch();
  };

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color={Themes.primary}>
          {`${t('disciplines.DISCIPLINES')} → ${subjectId}`}
        </Typography>
        {possibleEdit ? (
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <Button
              type="button"
              startIcon={<Cancel />}
              style={{ borderRadius: '1.5rem', paddingRight: '1rem' }}
              size="small"
              variant="contained"
              onClick={() => {
                setPossibleEdit(false);
                reset({
                  ...disciplineData,
                  students: (disciplineData?.students ?? []).join(', '),
                });
              }}
            >
              {t('disciplines.CANCEL')}
            </Button>
            <Button
              type="button"
              startIcon={!isLoading && <Save />}
              style={{ borderRadius: '1.5rem', paddingRight: '1rem' }}
              size="small"
              variant="contained"
              sx={{ gap: isLoading ? '.5rem' : 'unset' }}
              onClick={onSubmit}
            >
              {isLoading && (
                <CircularProgress size={'1rem'} color="secondary" />
              )}
              {t('disciplines.SAVE')}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            startIcon={<Edit />}
            style={{ borderRadius: '1.5rem', paddingRight: '1rem' }}
            size="small"
            variant="contained"
            onClick={() => setPossibleEdit(true)}
          >
            {t('disciplines.EDIT')}
          </Button>
        )}
      </MainScreen.Title>

      <MainScreen.Content>
        <S.Container>
          {disciplineLoading ? (
            <Skeleton
              style={{
                gridArea: 'a',
                borderRadius: '1.5rem',
                animationDuration: '1.5s',
              }}
              width={'100%'}
              height={'100%'}
              variant="rectangular"
            />
          ) : (
            <DisciplinesInfos
              form={form}
              formData={formData}
              possibleEdit={possibleEdit}
            />
          )}
          {disciplineLoading ? (
            <Skeleton
              style={{
                gridArea: 'b',
                borderRadius: '1.5rem',
                animationDuration: '1.5s',
              }}
              width={'100%'}
              height={'100%'}
              variant="rectangular"
            />
          ) : (
            <DisciplinesStudents form={form} possibleEdit={possibleEdit} />
          )}

          {disciplineLoading ? (
            <Skeleton
              style={{
                gridArea: 'c',
                borderRadius: '1.5rem',
                animationDuration: '1.5s',
              }}
              width={'100%'}
              height={'100%'}
              variant="rectangular"
            />
          ) : (
            <DisciplinesProgram form={form} possibleEdit={possibleEdit} />
          )}
        </S.Container>
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default DisciplinesDetails;
