import React from 'react';
import { Cards as S } from '../Disciplines.style';

export const generateColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

const Cards: React.FC = () => {
  return <S.Container cardColor={generateColor()}>Cards</S.Container>;
};

export default Cards;
