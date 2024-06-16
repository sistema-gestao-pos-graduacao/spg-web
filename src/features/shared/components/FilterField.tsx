import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react';
import {
  ClassResponseProps,
  ContextProps,
  PersonResponseProps,
  StateAction,
  SubjectsResponseProps,
} from '../Shared.types';
import useApi from '../useApi';
import { HttpMethods, Roles } from '../Shared.consts';
import { CLASSES_ROUTE, PERSONS_ROUTE, SUBJECTS_ROUTE } from '../RoutesURL';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../Context';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const FilterField: React.FC<{
  filteredSubjects: number[];
  setFilteredSubjects: StateAction<number[]>;
  filteredTeacher: number[];
  setFilteredTeacher: StateAction<number[]>;
  filteredClasses: number[];
  setFilteredClasses: StateAction<number[]>;
  setCurriculumId?: StateAction<number[]>;
  classScreen?: boolean;
  scheduleScreen?: boolean;
}> = ({
  classScreen,
  scheduleScreen,
  filteredTeacher,
  filteredSubjects,
  filteredClasses,
  setFilteredSubjects,
  setFilteredTeacher,
  setFilteredClasses,
  setCurriculumId,
}) => {
  const { t } = useTranslation();
  const { userLogged, visionMode } = useContext<ContextProps>(GlobalContext);

  const { data: classData, isLoading: classLoading } = useApi<
    ClassResponseProps[]
  >(CLASSES_ROUTE, HttpMethods.GET);

  const { data: personData, isLoading: personLoading } = useApi<
    PersonResponseProps[]
  >(`${PERSONS_ROUTE}`, HttpMethods.GET, true, {}, { personType: 'Teacher' });

  const curriculumList = useMemo(() => {
    return classData
      ?.filter(({ id }) => filteredClasses.includes(id))
      .map(({ curriculumId }) => Number(curriculumId));
  }, [filteredClasses, classData]);

  const { data: disciplineData, isLoading: disciplineLoading } = useApi<
    SubjectsResponseProps[]
  >(
    SUBJECTS_ROUTE,
    HttpMethods.GET,
    curriculumList && curriculumList.length > 0,
    {},
    visionMode === Roles.TEACHER
      ? {
          teacherId: userLogged?.personId,
        }
      : {
          curriculumId:
            curriculumList && curriculumList.length > 0
              ? `list(${curriculumList.join()})`
              : null,
          teacherId:
            filteredTeacher.length > 0
              ? `list(${filteredTeacher.join()})`
              : null,
        },
  );

  useEffect(() => {
    if (curriculumList && setCurriculumId) setCurriculumId(curriculumList);
  }, [curriculumList]);

  const getSelectIcon = (loading: boolean, open: boolean) =>
    loading ? (
      <CircularProgress
        size={'1.2rem'}
        sx={{ margin: '0 1rem 0 0', color: 'rgba(0, 0, 0, 0.54)' }}
      />
    ) : open ? (
      <ArrowDropUpIcon
        sx={{
          margin: '.3rem 1rem 0 0',
          color: 'rgba(0, 0, 0, 0.54)',
        }}
      />
    ) : (
      <ArrowDropDownIcon
        sx={{
          margin: '.3rem 1rem 0 0',
          color: 'rgba(0, 0, 0, 0.54)',
        }}
      />
    );

  return (
    <div
      style={{ display: 'flex', gap: '1rem', margin: '.5rem 0', width: '100%' }}
    >
      {classScreen && (
        <FormControl sx={{ flex: '1', maxWidth: '20rem' }}>
          <InputLabel size={'small'}>{t('shared.CLASSES')}</InputLabel>
          <Select
            label={t('shared.CLASSES')}
            MenuProps={{ PaperProps: { sx: { maxHeight: '15rem' } } }}
            onChange={(e: SelectChangeEvent<number[]>) => {
              setFilteredClasses(e.target.value as number[]);

              if (scheduleScreen)
                setFilteredClasses(
                  filteredClasses.includes(Number(e.target.value))
                    ? []
                    : [Number(e.target.value)],
                );
              else setFilteredClasses(e.target.value as number[]);
              setFilteredSubjects([]);
              setFilteredTeacher([]);
            }}
            disabled={classLoading}
            size={'small'}
            multiple={!scheduleScreen}
            value={filteredClasses}
            IconComponent={({ className }) =>
              getSelectIcon(
                classLoading,
                className.split('-').includes('iconOpen'),
              )
            }
          >
            {classData?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {(!classScreen || (scheduleScreen && filteredClasses.length > 0)) && (
        <FormControl sx={{ flex: '1', maxWidth: '20rem' }}>
          <InputLabel size={'small'}>{t('shared.SUBJECTS')}</InputLabel>
          <Select
            label={t('shared.SUBJECTS')}
            MenuProps={{ PaperProps: { sx: { maxHeight: '15rem' } } }}
            onChange={(e: SelectChangeEvent<number[]>) =>
              setFilteredSubjects(e.target.value as number[])
            }
            disabled={disciplineLoading}
            size={'small'}
            multiple
            value={filteredSubjects}
            IconComponent={({ className }) =>
              getSelectIcon(
                disciplineLoading,
                className.split('-').includes('iconOpen'),
              )
            }
          >
            {disciplineData?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {visionMode !== Roles.TEACHER &&
        (!classScreen || (scheduleScreen && filteredClasses.length > 0)) && (
          <FormControl sx={{ flex: '1', maxWidth: '20rem' }}>
            <InputLabel size={'small'}>{t('shared.TEACHERS')}</InputLabel>
            <Select
              label={t('shared.TEACHERS')}
              MenuProps={{ PaperProps: { sx: { maxHeight: '15rem' } } }}
              onChange={(e: SelectChangeEvent<number[]>) => {
                if (scheduleScreen)
                  setFilteredTeacher(
                    filteredTeacher.includes(Number(e.target.value))
                      ? []
                      : [Number(e.target.value)],
                  );
                else setFilteredTeacher(e.target.value as number[]);
                setFilteredSubjects([]);
              }}
              disabled={personLoading}
              size={'small'}
              multiple={!scheduleScreen}
              value={filteredTeacher}
              IconComponent={({ className }) =>
                getSelectIcon(
                  personLoading,
                  className.split('-').includes('iconOpen'),
                )
              }
            >
              {personData?.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
    </div>
  );
};

export default FilterField;
