import styled from 'styled-components';

export const DisciplinesContainer = {
  Container: styled.div`
    display: flex;
    margin: 1rem;
    background-color: white;
    border-radius: 1.5rem;
  `,
  Content: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    margin: 1rem;
    background-color: ${({ theme }) => theme.white};
    gap: 1rem;
    overflow: auto;
    max-width: 1800px;
  `,
};

export const Cards = {
  Container: styled.div<{ cardColor: string }>`
    display: flex;
    min-width: 12rem;
    min-height: 12rem;
    background-color: ${({ cardColor }) => cardColor};
    box-shadow: 5px 5px 6px ${({ theme }) => theme.gray};
    border-radius: 1.5rem;
    padding: 1rem;
  `,
};
