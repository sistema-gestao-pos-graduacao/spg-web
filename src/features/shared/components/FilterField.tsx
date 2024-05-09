import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useContext } from 'react';
import {
  ContextProps,
  PersonResponseProps,
  StateAction,
  SubjectsResponseProps,
} from '../Shared.types';
import useApi from '../useApi';
import { HttpMethods, Roles } from '../Shared.consts';
import { PERSONS_ROUTE, SUBJECTS_ROUTE } from '../RoutesURL';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../Context';

const FilterField: React.FC<{
  classScreen: boolean;
  filteredSubjects: number[];
  setFilteredSubjects: StateAction<number[]>;
  filteredTeacher: number[];
  setFilteredTeacher: StateAction<number[]>;
  filteredClasses: number[];
  setFilteredClasses: StateAction<number[]>;
}> = ({
  classScreen,
  filteredTeacher,
  filteredSubjects,
  filteredClasses,
  setFilteredSubjects,
  setFilteredTeacher,
  setFilteredClasses,
}) => {
  const { t } = useTranslation();
  const { userLogged, visionMode } = useContext<ContextProps>(GlobalContext);

  const { data: personData, isLoading: personLoading } = useApi<
    PersonResponseProps[]
  >(`${PERSONS_ROUTE}?personType=Teacher`, HttpMethods.GET);

  const { data: disciplineData, isLoading: disciplineLoading } = useApi<
    SubjectsResponseProps[]
  >(
    visionMode === Roles.TEACHER
      ? `${SUBJECTS_ROUTE}?teacherId=${userLogged?.personId}`
      : SUBJECTS_ROUTE,
    HttpMethods.GET,
  );

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '.5rem 0' }}>
      {classScreen && (
        <FormControl>
          <InputLabel size={'small'}>{t('shared.CLASSES')}</InputLabel>
          <Select
            label={t('shared.CLASSES')}
            sx={{ width: '20rem' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: '15rem' } } }}
            onChange={(e: SelectChangeEvent<number[]>) =>
              setFilteredClasses(e.target.value as number[])
            }
            disabled={disciplineLoading}
            size={'small'}
            multiple
            value={filteredClasses}
          >
            {disciplineData?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

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

      {visionMode !== Roles.TEACHER && (
        <FormControl>
          <InputLabel size={'small'}>{t('shared.TEACHERS')}</InputLabel>
          <Select
            label={t('shared.TEACHERS')}
            sx={{ width: '20rem' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: '15rem' } } }}
            onChange={(e: SelectChangeEvent<number[]>) =>
              setFilteredTeacher(e.target.value as number[])
            }
            disabled={personLoading}
            size={'small'}
            multiple
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
