import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.light_gray};
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'nav nav'
    'sid .';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
`;

export const Navbar = {
  Container: styled.div`
    grid-area: nav;
    display: grid;
    grid-template-columns: 0.3fr 1fr 0.3fr;
    width: 100%;
    height: 4rem;
    background-color: white;
    border-bottom: 1px solid ${({ theme }) => theme.gray};
    border-radius: 0 0 20px 0;
    justify-content: space-between;
    padding: 0.7rem 1.2rem;
  `,
  Menu: styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  User: styled.span`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  `,
};

export const Sidebar = {
  Container: styled.div`
    grid-area: 'sid';
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: ${({ theme }) => theme.white};
    width: fit-content;
    padding: 0.5rem;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid ${({ theme }) => theme.gray};
    border-radius: 0 0 1rem 0;
  `,
  Cards: styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
  `,
  User: styled.span`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  `,
  Config: styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  WrapperUser: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.light_gray};
  `,
};

export const Card = {
  CardContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover {
      span:first-child {
        background-color: ${({ theme }) => theme.medium_primary};
      }
      path {
        fill: ${({ theme }) => theme.primary};
      }
      span:last-child {
        color: ${({ theme }) => theme.medium_primary};
      }
    }
  `,
  CardIcon: styled.span<{ active: boolean }>`
    display: flex;
    width: 2.8rem;
    height: 2.8rem;
    background-color: ${({ active, theme }) =>
      active ? theme.medium_primary : theme.light_primary};
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    box-shadow: 2px 2px 10px ${({ theme }) => theme.gray};
  `,
  CardLabel: styled.span<{ active: boolean }>`
    font-size: 0.5rem;
    font-weight: 700;
    color: ${({ active, theme }) =>
      active ? theme.medium_primary : theme.light_primary};
  `,
};
