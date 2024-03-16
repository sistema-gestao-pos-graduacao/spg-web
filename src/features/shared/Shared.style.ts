import styled from 'styled-components';

export const LogoStyle = {
  Content: styled.span<{ $position?: string }>`
    display: flex;
    position: ${({ $position }) => $position ?? 'absolute'};
    align-items: flex-end;
  `,
  Title: styled.span<{ $titleSize?: string; $lineHeight?: string }>`
    line-height: ${({ $lineHeight }) => $lineHeight ?? '4rem'};
    font-size: ${({ $titleSize }) => $titleSize ?? '4.7rem'};
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
  `,
  SubtitleContent: styled.span`
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  Subtitle: styled.span<{ $subTitleSize?: string }>`
    font-size: ${({ $subTitleSize }) => $subTitleSize ?? '0.5rem'};
    font-weight: 700;
    color: ${({ theme }) => theme.medium_primary};
  `,
};

export const MainScreen = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    background-color: white;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    flex: 1;
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
  Title: styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;
  `,
};

export const CircularLoadingContent = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;

  span {
    width: 8rem !important;
    height: 8rem !important;
  }
`;
