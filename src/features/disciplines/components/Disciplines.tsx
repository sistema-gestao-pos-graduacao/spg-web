import React from 'react';
import { DisciplinesContainer as S } from '../Disciplines.style';
import Cards from './Cards';

const Disciplines: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, , 2, 3, 4].map(() => (
          <Cards />
        ))}
      </S.Content>
    </S.Container>
  );
};

export default Disciplines;
