import {
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
  >(`${PERSONS_ROUTE}?personType=Teacher`, HttpMethods.GET);

  const curriculumList = useMemo(() => {
    return classData
      ?.filter(({ id }) => filteredClasses.includes(id))
      .map(({ curriculumId }) => Number(curriculumId));
  }, [filteredClasses, classData]);

  const { data: disciplineData, isLoading: disciplineLoading } = useApi<
    SubjectsResponseProps[]
  >(
    visionMode === Roles.TEACHER
      ? `${SUBJECTS_ROUTE}?teacherId=${userLogged?.personId}`
      : `${SUBJECTS_ROUTE}${curriculumList && curriculumList.length > 0 ? `?curriculumId=list(${curriculumList.join()})` : ''}${
          filteredTeacher.length > 0
            ? `&teacherId=list(${filteredTeacher.join()})`
            : ''
        }`,
    HttpMethods.GET,
  );

  useEffect(() => {
    if (curriculumList && setCurriculumId) setCurriculumId(curriculumList);
  }, [curriculumList]);

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '.5rem 0' }}>
      {classScreen && (
        <FormControl>
          <InputLabel size={'small'}>{t('shared.CLASSES')}</InputLabel>
          <Select
            label={t('shared.CLASSES')}
            sx={{ width: '20rem' }}
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
        <FormControl>
          <InputLabel size={'small'}>{t('shared.SUBJECTS')}</InputLabel>
          <Select
            label={t('shared.SUBJECTS')}
            sx={{ width: '20rem' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: '15rem' } } }}
            onChange={(e: SelectChangeEvent<number[]>) =>
              setFilteredSubjects(e.target.value as number[])
            }
            disabled={disciplineLoading}
            size={'small'}
            multiple
            value={filteredSubjects}
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
          <FormControl>
            <InputLabel size={'small'}>{t('shared.TEACHERS')}</InputLabel>
            <Select
              label={t('shared.TEACHERS')}
              sx={{ width: '20rem' }}
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
