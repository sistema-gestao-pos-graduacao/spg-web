import styled from 'styled-components';
import { Themes } from './../shared/Shared.consts';

export const ScheduledTable = {
  Content: styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  `,
  Header: styled.div``,
};

export const Modal = {
  Header: styled.span<{ backgrounColor: string }>`
    display: flex;
    justify-content: center;
    padding: 1.2rem 0;
    background-color: ${({ backgrounColor }) => backgrounColor};
    color: #ffffff;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: 1rem;
    color: ${({ theme }) => theme.primary};
  `,
  field: styled.span`
    display: flex;
    gap: 0.2rem;
  `,
};

export const CalendarContainer = styled.span`
  height: 100%;
  width: 100%;
  padding: 0 1rem 1rem 0;

  .rbc-header {
    color: ${Themes.primary};
    padding: 1.2rem 0 !important;
    text-transform: capitalize;
    font-size: 1rem;
  }
`;
