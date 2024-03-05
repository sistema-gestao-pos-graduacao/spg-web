import styled from 'styled-components';

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
