import styled from 'styled-components';

import { Card, CardActionArea } from '@mui/material';

export const RegisterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;
export const CardIcon = styled.span`
  display: flex;
  width: 2.8rem;
  height: 2.8rem;
  color: ${({ theme }) => theme.primary};
  font-size: 8rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  box-shadow: 2px 2px 10px ${({ theme }) => theme.gray};
`;

export const StyledCardAction = styled(CardActionArea)`
  && {
    display: grid;
    grid-template-rows: 0.5fr 1fr;
    justify-content: space-between;
    justify-items: center;
    height: 100%;
  }
`;

export const StyledCard = styled(Card)`
  && {
    max-width: 18rem;
    min-height: 22rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 10px ${({ theme }) => theme.gray};
  }
`;
export const StepFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
