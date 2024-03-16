import React from 'react';
import { Folder as S } from '../Disciplines.style';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const generateColor = () => {
  const minIntensity = 0;
  const maxIntensity = 150;
  const color = () =>
    Math.floor(Math.random() * (maxIntensity - minIntensity + 1)) +
    minIntensity;

  return `rgb(${color()}, ${color()}, ${color()})`;
};
const Folder: React.FC<{
  discipline: {
    discipline: string;
    activesClasses: number;
    period: number;
  };
}> = ({ discipline }) => {
  const { t } = useTranslation();
  const color = generateColor();

  return (
    <S.Container>
      <S.Left $cardColor={color} />
      <S.Upper $cardColor={color} />
      <S.Content $cardColor={color}>
        <Typography>{discipline.discipline}</Typography>
        <span>
          <S.fieldText>
            <Typography fontSize=".6rem">
              {t('disciplines.ACTIVES_CLASSES')}
            </Typography>
            <Typography fontSize=".6rem">
              {discipline.activesClasses}
            </Typography>
          </S.fieldText>
          <S.fieldText>
            <Typography fontSize=".6rem">{t('disciplines.PERIOD')}</Typography>
            <Typography fontSize=".6rem">{discipline.period}º</Typography>
          </S.fieldText>
        </span>
      </S.Content>
    </S.Container>
  );
};

export default Folder;
