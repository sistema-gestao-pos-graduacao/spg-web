import React from 'react';
import { Folder as S } from '../Disciplines.style';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
    id: number;
  };
}> = ({ discipline }) => {
  const color = generateColor();

  return (
    <Link to={`disciplina/${discipline.id}`}>
      <S.Container>
        <S.Left $cardColor={color} />
        <S.Upper $cardColor={color} />
        <S.Content $cardColor={color}>
          <Typography>{discipline.discipline}</Typography>
        </S.Content>
      </S.Container>
    </Link>
  );
};

export default Folder;
