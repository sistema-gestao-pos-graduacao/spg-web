import styled from 'styled-components';

export const DisciplinesContainer = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    background-color: white;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem 1rem 1rem;
  `,
  Content: styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex: 1;
    margin-top: 0.5rem;
    background-color: ${({ theme }) => theme.white};
    gap: 1rem;
    overflow: auto;
    max-width: 1800px;
  `,
};

export const Folder = {
  Container: styled.div`
    display: flex;
    position: relative;
    width: 12rem;
    height: 12rem;
    box-shadow: 5px 5px 6px ${({ theme }) => theme.gray};
    border-radius: 1.5rem;
    overflow: hidden;
    &:hover {
      filter: brightness(115%);
      cursor: pointer;
    }
  `,

  Content: styled.div<{ cardColor: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    height: 85%;
    width: 100%;
    background-color: ${({ cardColor }) => cardColor};
    border-radius: 1.5rem 0 0 0;
    padding: 0.8rem;
    z-index: 1;
    color: ${({ theme }) => theme.white};
  `,

  Upper: styled.div<{ cardColor: string }>`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    height: 20%;
    width: 90%;
    border-radius: 1.5rem 0 0 0;
    opacity: 0.5;
    background-color: ${({ cardColor }) => cardColor};
  `,

  Left: styled.div<{ cardColor: string }>`
    display: flex;
    clip-path: polygon(56% 0, 100% 0%, 100% 100%, 40% 100%);
    position: absolute;
    top: 0;
    right: 0;
    height: 20%;
    width: 90%;
    background-color: color;
    border-radius: 1.5rem 0 0 0;
    z-index: 1;
    background-color: ${({ cardColor }) => cardColor};
  `,

  fieldText: styled.span`
    display: flex;
    gap: 0.2rem;
  `,
};
