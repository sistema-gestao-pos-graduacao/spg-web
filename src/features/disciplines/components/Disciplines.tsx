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
      activesClasses: 2,
      period: 1,
      objectId: 1,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
      objectId: 2,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 3,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 4,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 5,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 6,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 7,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
      objectId: 8,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 9,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 10,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 11,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 12,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 13,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
      objectId: 14,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 15,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 16,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 17,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 18,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 19,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
      objectId: 20,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 21,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 22,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 23,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
      objectId: 24,
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
          <Folder key={discipline.objectId} discipline={discipline} />
        ))}
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Disciplines;
