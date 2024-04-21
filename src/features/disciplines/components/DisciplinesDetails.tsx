import React, { useEffect, useMemo, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Themes } from '../../shared/Shared.consts';
import { DisciplinesDetails as S } from '../Disciplines.style';
import { useForm } from 'react-hook-form';
import { Cancel, Edit, Save } from '@mui/icons-material';
import { DisciplineForm } from '../Disciplines.props';
import CircularLoading from '../../shared/components/CircularLoading';
import DisciplinesInfos from './DisciplinesInfos';
import DisciplinesStudents from './DisciplinesStudents';
import DisciplinesProgram from './DisciplinesProgram';

const DisciplinesDetails: React.FC = () => {
  const { t } = useTranslation();
  const [possibleEdit, setPossibleEdit] = useState<boolean>(false);
  const form = useForm<DisciplineForm>();
  const { reset, getValues } = form;

  const disciplines = useMemo(
    () => ({
      discipline: 'Controle de Processos',
      id: 24,

      teacher: 'Renata',
      location: null,
      building: null,
      room: null,
      dayWeek: new Date('2024/04/20'),
      time: '17:00 - 18:00',

      considerations: null,
      students: null,
      courseProgram: null,
    }),
    [],
  );

  useEffect(() => {
    reset({
      ...disciplines,
      students: (disciplines.students ?? []).join(),
    });
  }, [disciplines]);

  const formData = useMemo(
    () => [
      {
        label: t('disciplines.TEACHER'),
        edited: false,
        key: 'teacher',
        type: 'text',
      },
      {
        label: t('disciplines.DISCIPLINE'),
        edited: false,
        key: 'discipline',
        type: 'text',
      },
      {
        label: t('disciplines.DAY_WEEK'),
        edited: false,
        key: 'dayWeek',
        type: 'text',
      },
      {
        label: t('disciplines.TIME'),
        edited: false,
        key: 'time',
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
    console.log('ATUALIZADO -> ', getValues());
  };

  if (!disciplines || Object.keys(getValues()).length === 0)
    return <CircularLoading />;

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color={Themes.primary}>
          {`${t('disciplines.DISCIPLINES')} → ${disciplines.id}`}
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
                  ...disciplines,
                  students: (disciplines.students ?? []).join(),
                });
              }}
            >
              {t('disciplines.CANCEL')}
            </Button>
            <Button
              type="button"
              startIcon={<Save />}
              style={{ borderRadius: '1.5rem', paddingRight: '1rem' }}
              size="small"
              variant="contained"
              onClick={() => {
                setPossibleEdit(false);
                onSubmit();
              }}
            >
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
          <DisciplinesInfos
            form={form}
            formData={formData}
            possibleEdit={possibleEdit}
          />
          <DisciplinesStudents form={form} possibleEdit={possibleEdit} />

          <DisciplinesProgram form={form} possibleEdit={possibleEdit} />
        </S.Container>
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default DisciplinesDetails;
