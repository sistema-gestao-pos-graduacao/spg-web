import React, { useContext, useMemo, useState } from 'react';
import { MainScreen } from '../../shared/Shared.style';
import Folder from './Folder';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HttpMethods, Roles, Themes } from '../../shared/Shared.consts';
import useApi from '../../shared/useApi';
import { CLASSES_ROUTE, SUBJECTS_ROUTE } from '../../shared/RoutesURL';
import {
  ClassResponseProps,
  ContextProps,
  SubjectsResponseProps,
} from '../../shared/Shared.types';
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

  const { data: classData, isLoading: classLoading } = useApi<
    ClassResponseProps[]
  >(
    filteredClasses.length === 0
      ? CLASSES_ROUTE
      : `${CLASSES_ROUTE}?id=list(${filteredClasses.join()})`,
    HttpMethods.GET,
  );
  const classScreen = pathname === '/';

  const curriculumId = useMemo(() => {
    if (classData && classData.length > 0)
      return classData.find(({ id }) => id === Number(pathname.split('/')[1]))
        ?.curriculumId;
  }, [pathname, classData]);

  const query = useMemo(() => {
    const subjectFilter =
      filteredSubjects.length > 0 ? `id=list(${filteredSubjects.join()})` : '';

    const teacherFilter =
      filteredTeacher.length > 0
        ? `teacherId=list(${filteredTeacher.join()})`
        : visionMode === Roles.TEACHER && userLogged
          ? `teacherId=${userLogged.personId}`
          : '';

    const filters = [subjectFilter, teacherFilter].filter(Boolean).join('&');
    const queryParams = filters ? `&${filters}` : '';

    return `${SUBJECTS_ROUTE}?curriculumId=${curriculumId}${queryParams}`;
  }, [
    filteredSubjects,
    filteredTeacher,
    filteredClasses,
    userLogged,
    visionMode,
    curriculumId,
  ]);

  const { data: disciplinesData, isLoading } = useApi<SubjectsResponseProps[]>(
    query,
    HttpMethods.GET,
    !!curriculumId,
  );

  const getContentDiscipline = () => {
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
    return disciplinesData.map((data) => (
      <Folder key={data.id} discipline={data} />
    ));
  };

  const getContentClass = () => {
    if (classLoading) {
      return Array(12)
        .fill(0)
        .map((_, index) => <FolderLoading key={index} />);
    }
    if (!classData || classData.length === 0) {
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
    return classData.map((data) => <Folder key={data.id} discipline={data} />);
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
      <MainScreen.Content>
        {classScreen ? getContentClass() : getContentDiscipline()}
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Disciplines;
