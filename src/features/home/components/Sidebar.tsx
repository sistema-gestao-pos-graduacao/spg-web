import React, { useContext, useEffect, useState } from 'react';
import { Sidebar as S } from '../Home.style';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import { SidebarCard } from '../Home.types';
import SidebarItem from './SidebarItem';
import { useTranslation } from 'react-i18next';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { Menu, Typography } from '@mui/material';
import { ContextProps } from '../../shared/Shared.types';
import { GlobalContext } from '../../shared/Context';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { userLogged } = useContext<ContextProps>(GlobalContext);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  const sidebarItens: SidebarCard[] = [
    {
      label: t('home.DISCIPLINES'),
      icon: HomeOutlinedIcon,
      route: '/',
      isActive: true,
    },
    {
      label: t('home.REQUIREMENTS'),
      icon: EditNoteOutlinedIcon,
      route: '/requerimentos',
      isActive: false,
    },
    {
      label: t('home.CHAT'),
      icon: ChatOutlinedIcon,
      route: '/chat',
      isActive: false,
    },
    {
      label: t('home.CALENDAR'),
      icon: CalendarMonthOutlinedIcon,
      route: '/calendario',
      isActive: true,
    },
    {
      label: t('home.SCHEDULE'),
      icon: LockClockOutlined,
      route: '/horarios',
      isActive: true,
    },
    {
      label: t('home.REGISTERS'),
      icon: ClassOutlinedIcon,
      route: '/cadastros',
      isActive: false
    },
  ];
  return (
    <S.Container>
      <S.Cards>
        {sidebarItens.map((item, index) => (
          <SidebarItem
            key={item.label}
            item={item}
            active={!!(index === activeItem)}
            index={index}
            setActive={setActiveItem}
          />
        ))}
      </S.Cards>
      <S.User>
        <S.WrapperUser onClick={() => setOpenProfile(true)}>
          <Typography
            textTransform="capitalize"
            fontWeight={500}
            fontSize={'1.5rem'}
          >
            {userLogged?.username[0]}
          </Typography>
        </S.WrapperUser>
        <Menu
          sx={{ marginLeft: '3rem' }}
          open={openProfile}
          onClose={() => setOpenProfile(false)}
        >
          <S.UserMenu>
            <S.Infos>
              <Typography
                textTransform="capitalize"
                fontWeight={500}
                fontSize={'1rem'}
              >
                {userLogged?.username}
              </Typography>
              <Typography
                textTransform="capitalize"
                fontWeight={500}
                fontSize={'1rem'}
              >
                {userLogged?.email ?? 'dawdwa'}
              </Typography>
            </S.Infos>
            <S.Config>
              <BuildCircleOutlinedIcon />
              <Typography fontWeight={500} fontSize={'.8rem'}>
                Configurações
              </Typography>
            </S.Config>
          </S.UserMenu>
        </Menu>
      </S.User>
    </S.Container>
  );
};

export default Sidebar;
