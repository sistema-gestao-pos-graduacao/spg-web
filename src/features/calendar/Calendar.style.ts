import styled from 'styled-components';

export const CalendarContainer = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    background-color: white;
    border-radius: 1.5rem;
    padding: 1rem;
    width: 100%;
  `,
  Content: styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex: 1;
    margin: 1rem 0;
    background-color: ${({ theme }) => theme.white};
    gap: 1rem;
    overflow: auto;
    max-width: 1800px;
  `,
};
