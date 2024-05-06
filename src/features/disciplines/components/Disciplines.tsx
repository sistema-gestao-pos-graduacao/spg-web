import React, { useContext } from 'react';
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

const Disciplines: React.FC = () => {
  const { t } = useTranslation();

  const { visionMode, userLogged } = useContext<ContextProps>(GlobalContext);

  const { data: disciplinesData, isLoading } = useApi<SubjectsResponseProps[]>(
    visionMode === Roles.TEACHER
      ? `${SUBJECTS_ROUTE}?teacherId=${userLogged?.personId}`
      : SUBJECTS_ROUTE,
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
      <Folder key={discipline.id} discipline={discipline} />
    ));
  };

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color={Themes.primary}>
          {t('disciplines.DISCIPLINES')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content>{getContent()}</MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Disciplines;
