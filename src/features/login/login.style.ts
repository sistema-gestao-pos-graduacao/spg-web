import styled from 'styled-components';

export const LoginStyle = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.light_gray};
`;

export const TitleStyle = {
  Content: styled.span`
    display: flex;
    position: absolute;
    align-items: flex-end;
    height: 4.7rem;
  `,
  Title: styled.span`
    height: 4.7rem;
    font-size: 4.7rem;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
  `,
  SubtitleContent: styled.span`
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  Subtitle: styled.span`
    font-size: 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.light_primary};
  `,
};
