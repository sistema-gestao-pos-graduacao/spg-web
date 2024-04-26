import styled from 'styled-components';

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

  Content: styled.div<{ $cardColor: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    height: 85%;
    width: 100%;
    background-color: ${({ $cardColor }) => $cardColor};
    border-radius: 1.5rem 0 0 0;
    padding: 0.8rem;
    z-index: 1;
    color: ${({ theme }) => theme.white};
  `,

  Upper: styled.div<{ $cardColor: string }>`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    height: 20%;
    width: 90%;
    border-radius: 1.5rem 0 0 0;
    opacity: 0.5;
    background-color: ${({ $cardColor }) => $cardColor};
  `,

  Left: styled.div<{ $cardColor: string }>`
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
    background-color: ${({ $cardColor }) => $cardColor};
  `,

  fieldText: styled.span`
    display: flex;
    gap: 0.2rem;
  `,
};

export const DisciplinesDetails = {
  Container: styled.div`
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-rows: 1.25fr 0.75fr;
    grid-template-areas:
      'a a a'
      'b c c';
    gap: 0.5rem;
    height: 100%;
    flex: 1;
  `,
  DetailsContainer: styled.div`
    display: flex;
    flex-direction: column;
    grid-area: a;
    width: 99%;
    border-radius: 1.5rem;
    box-shadow: 3px 5px 7px ${({ theme }) => theme.gray};
    padding: 1rem;
    gap: 1rem;
  `,
  StudentsContainer: styled.div`
    display: flex;
    flex-direction: column;
    grid-area: b;
    height: 99%;
    border-radius: 1.5rem;
    box-shadow: 3px 5px 7px ${({ theme }) => theme.gray};
    padding: 1rem;

    ul {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-y: auto;
    }
  `,
  ProgramContainer: styled.div`
    display: flex;
    flex-direction: column;
    grid-area: c;
    height: 99%;
    width: 99%;
    border-radius: 1.5rem;
    box-shadow: 3px 5px 7px ${({ theme }) => theme.gray};
    padding: 1rem;
    max-height: 100%;
  `,
  Input: styled.input<{ $possibleEdit: boolean }>`
    display: flex;
    border: none;
    color: ${({ theme }) => theme.primary};
    width: auto;
    text-transform: capitalize;
    background-color: unset;
    border: ${({ $possibleEdit, theme }) =>
      $possibleEdit ? `1px solid ${theme.gray}` : 'unset'};
    border-radius: 0.6rem;

    resize: horizontal;

    &:focus-visible {
      outline: none;
    }
  `,
  Considerations: styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 1.5rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.light_gray};
    white-space: pre;
    flex: 1;
    box-shadow: 3px 5px 20px ${({ theme }) => theme.gray};
    flex: 1;
    resize: horizontal;
  `,
  TextArea: styled.textarea<{ $possibleEdit?: boolean }>`
    border: unset;
    flex: 1;
    outline: unset;
    background-color: unset;
    resize: none;
    border: ${({ $possibleEdit, theme }) =>
      $possibleEdit ? `1px solid ${theme.gray}` : 'unset'};
    border-radius: 0.6rem;
    font-family: 'Roboto';
    color: ${({ theme }) => theme.primary};
  `,
  StudentsHeader: styled.span`
    display: flex;
    align-items: center;
    gap: 0.3rem;
  `,
  StudentsList: styled.ul`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  InfoContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
  `,
  InfoItem: styled.span`
    display: flex;
    white-space: pre;
  `,
};
