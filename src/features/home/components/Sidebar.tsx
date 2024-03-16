import React, { useState } from 'react';
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
import { Typography } from '@mui/material';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<number>(0);

  const sidebarItens: SidebarCard[] = [
    {
      label: t('home.DISCIPLINES'),
      icon: HomeOutlinedIcon,
      route: '/',
    },
    {
      label: t('home.REQUIREMENTS'),
      icon: EditNoteOutlinedIcon,
      route: '/requerimentos',
    },
    {
      label: t('home.CHAT'),
      icon: ChatOutlinedIcon,
      route: '/chat',
    },
    {
      label: t('home.CALENDAR'),
      icon: CalendarMonthOutlinedIcon,
      route: '/calendario',
    },
    {
      label: t('home.SCHEDULE'),
      icon: LockClockOutlined,
      route: '/horarios',
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
        <S.Config>
          <BuildCircleOutlinedIcon />
          <Typography variant="subtitle2" fontSize={'.4rem'}>
            Configurações
          </Typography>
        </S.Config>
        <S.WrapperUser>P</S.WrapperUser>
      </S.User>
    </S.Container>
  );
};

export default Sidebar;
