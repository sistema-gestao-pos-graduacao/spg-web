import styled from 'styled-components';

export const LogoStyle = {
  Content: styled.span<{ position?: string }>`
    display: flex;
    position: ${({ position }) => position ?? 'absolute'};
    align-items: flex-end;
  `,
  Title: styled.span<{ titleSize?: string; lineHeight?: string }>`
    line-height: ${({ lineHeight }) => lineHeight ?? '4rem'};
    font-size: ${({ titleSize }) => titleSize ?? '4.7rem'};
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
  `,
  SubtitleContent: styled.span`
    display: flex;
    flex-direction: column;
    text-align: center;
  `,
  Subtitle: styled.span<{ subTitleSize?: string }>`
    font-size: ${({ subTitleSize }) => subTitleSize ?? '0.5rem'};
    font-weight: 700;
    color: ${({ theme }) => theme.medium_primary};
  `,
};
