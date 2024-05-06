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
    overflow: auto;
    width: 100%;
  `,
  Content: styled.div`
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    flex: 1;
    margin: 0.5rem 0;
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

export const CircularLoadingContent = styled.div<{ width?: string }>`
  display: flex;
  width: ${({ width }) => width ?? '100vw'};
  height: 100vh;
  align-items: center;
  justify-content: center;

  span {
    width: 8rem !important;
    height: 8rem !important;
  }
`;

export const AccordionContent = styled.div`
  .Mui-expanded {
    min-height: unset;
  }
  .MuiAccordionSummary-content {
    margin: 0.6rem 0 0 0;
  }
`;

export const ToastError = styled.span`
  display: flex;
  background-color: ${({ theme }) => theme.error};
  width: auto;
  max-width: 30rem;
  padding: 0.5rem 1rem;
  align-items: center;
  border-radius: 0.5rem;
  gap: 1rem;
`;

export const CustomModalLoading = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;
