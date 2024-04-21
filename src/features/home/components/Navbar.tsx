import React from 'react';
import { Navbar as S } from '../Home.style';
import Logo from '../../shared/components/Logo';
import RedirectMenu from '../../shared/components/RedirectMenu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useTranslation } from 'react-i18next';
import { StateAction } from '../../shared/Shared.types';

const Navbar: React.FC<{ setLogged: StateAction<boolean> }> = ({
  setLogged,
}) => {
  const { t } = useTranslation();
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
          listItems={['1', '2', '3', '4']}
        />
        <RedirectMenu
          label={t('home.PARTNERSHIPS')}
          listItems={['5', '6', '7', '8']}
        />
        <RedirectMenu
          label={t('home.RESUMES')}
          listItems={['9', '10', '11', '12']}
        />
        <RedirectMenu
          label={t('home.CONTACT')}
          listItems={['13', '14', '15', '16']}
        />
      </S.Menu>
      <S.User>
        <NotificationsOutlinedIcon fontSize="small" />
        <span onClick={() => setLogged(false)} style={{ cursor: 'pointer' }}>
          <LogoutOutlinedIcon fontSize="small" />
        </span>
      </S.User>
    </S.Container>
  );
};

export default Navbar;
