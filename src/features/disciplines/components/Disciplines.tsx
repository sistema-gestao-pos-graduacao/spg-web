import React from 'react';
import { MainScreen } from '../../shared/Shared.style';
import Folder from './Folder';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Themes } from '../../shared/Shared.consts';

const Disciplines: React.FC = () => {
  const { t } = useTranslation();

  const disciplines = [
    {
      discipline: 'Controle de Processos',
      id: 1,
    },
    {
      discipline: 'Processos Industriais',
      id: 2,
    },
    {
      discipline: 'Controle de Processos',
      id: 3,
    },
    {
      discipline: 'Controle de Processos',
      id: 4,
    },
    {
      discipline: 'Controle de Processos',
      id: 5,
    },
    {
      discipline: 'Controle de Processos',
      id: 6,
    },
    {
      discipline: 'Controle de Processos',
      id: 7,
    },
    {
      discipline: 'Processos Industriais',
      id: 8,
    },
    {
      discipline: 'Controle de Processos',
      id: 9,
    },
    {
      discipline: 'Controle de Processos',
      id: 10,
    },
    {
      discipline: 'Controle de Processos',
      id: 11,
    },
    {
      discipline: 'Controle de Processos',
      id: 12,
    },
    {
      discipline: 'Controle de Processos',
      id: 13,
    },
    {
      discipline: 'Processos Industriais',
      id: 14,
    },
    {
      discipline: 'Controle de Processos',
      id: 15,
    },
    {
      discipline: 'Controle de Processos',
      id: 16,
    },
  ];

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography fontWeight={700} color={Themes.primary}>
          {t('disciplines.DISCIPLINES')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content>
        {disciplines.map((discipline) => (
          <Folder key={discipline.id} discipline={discipline} />
        ))}
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Disciplines;
