import React from 'react';
import { CalendarContainer as S } from '../Calendar.style';
import calendar_2024 from '../../../assets/calendario_academico_2024-1.png';

const Calendar: React.FC = () => {
  return (
    <S.Container>
      <S.Content>
        <img src={calendar_2024} width={'100%'} />
      </S.Content>
    </S.Container>
  );
};

export default Calendar;
