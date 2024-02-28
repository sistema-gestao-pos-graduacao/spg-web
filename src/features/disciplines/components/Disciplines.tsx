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
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Processos Industriais',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
    {
      discipline: 'Controle de Processos',
      activesClasses: 2,
      period: 1,
    },
  ];

  return (
    <MainScreen.Container>
      <MainScreen.Title>
        <Typography color={Themes.primary}>
          {t('disciplines.DISCIPLINES')}
        </Typography>
      </MainScreen.Title>
      <MainScreen.Content>
        {disciplines.map((discipline) => (
          <Folder discipline={discipline} />
        ))}
      </MainScreen.Content>
    </MainScreen.Container>
  );
};

export default Disciplines;
