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
  Header: styled.span<{ $backgrounColor: string }>`
    display: flex;
    justify-content: center;
    padding: 1.2rem 0;
    background-color: ${({ $backgrounColor }) => $backgrounColor};
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

  tr {
    .rbc-header {
      padding: 1.2rem 1.2rem !important;
    }
  }

  .rbc-header {
    color: ${Themes.primary};
    padding: 1.2rem 0 !important;
    text-transform: capitalize;
  }
  .rbc-toolbar {
    text-transform: uppercase;
    font-weight: bold;

    button {
      text-transform: capitalize;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.light_primary} !important;
      }
    }
  }

  .rbc-active {
    background-color: ${({ theme }) => theme.light_primary} !important;
  }

  .rbc-addons-dnd-resizable {
    width: 100%;
  }

  tBody {
    text-transform: capitalize;
    color: ${({ theme }) => theme.white};
  }
  .rbc-event-label {
    margin-bottom: 0.2rem;
  }
`;

export const DisciplinesStyled = {
  Container: styled.span`
    display: flex;
    width: 25%;
    flex-direction: column;
    margin: 1rem 1rem 1rem 0;
    background-color: white;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
  `,
};

export const EventItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 0 0 0 0.1rem;
  border-radius: 0.3rem;
`;

export const EventItemContent = styled.div`
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RemoveEventButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const DisciplineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ModalTimeDiscipline = styled.input`
  display: flex;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
