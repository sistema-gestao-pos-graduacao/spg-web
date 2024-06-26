import React, { useContext } from 'react';
import { Navbar as S } from '../Home.style';
import Logo from '../../shared/components/Logo';
import RedirectMenu from '../../shared/components/RedirectMenu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useTranslation } from 'react-i18next';
import {
  ContextProps,
  CoursesResponseProps,
  StateAction,
} from '../../shared/Shared.types';
import useApi from '../../shared/useApi';
import {
  COURSES_ROUTE,
  CURRICULUM_ROUTE,
  LOGOUT_ROUTE,
} from '../../shared/RoutesURL';
import { HttpMethods, Roles } from '../../shared/Shared.consts';
import { CurriculomResponseProps } from '../../registers/Registers.types';
import { GlobalContext } from '../../shared/Context';

const Navbar: React.FC<{ setLogged: StateAction<boolean> }> = ({
  setLogged,
}) => {
  const { t } = useTranslation();
  const { setUserLogged, visionMode } = useContext<ContextProps>(GlobalContext);

  const { refetch } = useApi(LOGOUT_ROUTE, HttpMethods.POST, false);

  const { data: courseData, isLoading: courseLoading } = useApi<
    CoursesResponseProps[]
  >(COURSES_ROUTE, HttpMethods.GET);

  const { data: curriculumData, isLoading: curriculumLoading } = useApi<
    CurriculomResponseProps[]
  >(CURRICULUM_ROUTE, HttpMethods.GET);

  return (
    <S.Container>
      <Logo
        position="unset"
        lineHeight="2.5rem"
        titleSize="3rem"
        subTitleSize=".4rem"
      />
      <S.Menu
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RedirectMenu
          label={t('home.OUR_CURSES')}
          listItems={courseData?.map(({ name }) => name) ?? []}
          isLoading={courseLoading}
        />
        <RedirectMenu label={t('home.PARTNERSHIPS')} listItems={[]} isLoading />
        <RedirectMenu
          label={t('home.RESUMES')}
          listItems={curriculumData?.map(({ name }) => name) ?? []}
          isLoading={curriculumLoading}
        />
        <RedirectMenu label={t('home.CONTACT')} listItems={[]} isLoading />
      </S.Menu>
      <S.User>
        <span style={{ cursor: 'pointer' }}>
          <NotificationsOutlinedIcon fontSize="small" />
        </span>

        {visionMode != Roles.TEACHER && (
          <Link to="/configuracoes">
            <SettingsIcon fontSize="small" />
          </Link>
        )}
        <span
          onClick={() => {
            setLogged(false);
            setUserLogged(null);
            refetch();
          }}
          style={{ cursor: 'pointer' }}
        >
          <LogoutOutlinedIcon fontSize="small" />
        </span>
      </S.User>
    </S.Container>
  );
};

export default Navbar;
