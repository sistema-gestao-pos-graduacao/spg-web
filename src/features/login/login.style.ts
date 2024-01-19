import styled from 'styled-components';
import { THEMES } from './../shared/shared.consts';

export const LoginStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${THEMES.LIGHT_GRAY};
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
    color: ${THEMES.PRIMARY};
  `,
  SubtitleContent: styled.span`
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  Subtitle: styled.span`
    font-size: 0.5rem;
    font-weight: 700;
    color: ${THEMES.LIGHT_PRIMARY};
  `,
};
