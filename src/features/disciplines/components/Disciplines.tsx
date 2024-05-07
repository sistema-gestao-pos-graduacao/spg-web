import React, { useContext, useMemo, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import Folder from './Folder';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HttpMethods, Roles, Themes } from '../../shared/Shared.consts';
import useApi from '../../shared/useApi';
import { SUBJECTS_ROUTE } from '../../shared/RoutesURL';
import { ContextProps, SubjectsResponseProps } from '../../shared/Shared.types';
import FolderLoading from './FolderLoading';
import { GlobalContext } from '../../shared/Context';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { NoContent } from '../Disciplines.style';
import FilterField from '../../shared/components/FilterField';
import { useLocation } from 'react-router-dom';

const Disciplines: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [filteredTeacher, setFilteredTeacher] = useState<number[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<number[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<number[]>([]);
  const { visionMode, userLogged } = useContext<ContextProps>(GlobalContext);

  const classScreen = pathname === '/';

  const query = useMemo(() => {
    if (
      filteredSubjects.length > 0 ||
      filteredTeacher.length > 0 ||
      filteredClasses.length > 0
    ) {
      const subjectFilter =
        filteredSubjects.length > 0
          ? `id=${filteredSubjects.join('&id=')}`
          : '';
      const classesFilter =
        filteredClasses.length > 0 ? `id=${filteredClasses.join('&id=')}` : '';
      const teacherFilter =
        filteredTeacher.length > 0
          ? `teacherId=${filteredTeacher.join('&id=')}`
          : '';
      const filters = [subjectFilter, classesFilter, teacherFilter]
        .filter(Boolean)
        .join('&');
      const queryParams = filters ? `?${filters}` : '';
      return `${SUBJECTS_ROUTE}${queryParams}`;
    }
    return SUBJECTS_ROUTE;
  }, [filteredSubjects, filteredTeacher, filteredClasses]);

  const { data: disciplinesData, isLoading } = useApi<SubjectsResponseProps[]>(
    visionMode === Roles.TEACHER
      ? `${SUBJECTS_ROUTE}?teacherId=${userLogged?.personId}`
      : query,
    HttpMethods.GET,
  );

  const getContent = () => {
    if (isLoading) {
      return Array(12)
        .fill(0)
        .map((_, index) => <FolderLoading key={index} />);
    }
    if (!disciplinesData || disciplinesData.length === 0) {
      return (
        <NoContent>
          <FolderOpenIcon
            sx={{ width: '3rem', height: '3rem' }}
            color="primary"
          />
          <Typography fontSize="1.2rem" fontWeight={700} color="primary">
            {t('disciplines.NO_CONTENT')}
          </Typography>
        </NoContent>
      );
    }
    return disciplinesData?.map((discipline) => (
      <Folder
        key={discipline.id}
        discipline={discipline}
        classScreen={classScreen}
      />
    ));
  };

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color={Themes.primary}>
          {classScreen
            ? t('disciplines.CLASSES')
            : t('disciplines.DISCIPLINES')}
        </Typography>
      </MainScreen.Title>
      <FilterField
        classScreen={classScreen}
        filteredTeacher={filteredTeacher}
        setFilteredTeacher={setFilteredTeacher}
        filteredSubjects={filteredSubjects}
        setFilteredSubjects={setFilteredSubjects}
        filteredClasses={filteredClasses}
        setFilteredClasses={setFilteredClasses}
      />
      <MainScreen.Content>{getContent()}</MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Disciplines;
