import styled from 'styled-components';

import {
  Card,
  CardActionArea,
} from '@mui/material';

export const CardIcon = styled.span`
display: flex;
width: 2.8rem;
height: 2.8rem;
color: ${({ theme }) => theme.primary};
font-size: 8rem;
align-items: center;
margin: 2.8rem;
justify-content: center;
border-radius: 1rem;
box-shadow: 2px 2px 10px ${({ theme }) => theme.gray};
`;

export const StyledCardAction = styled(CardActionArea)`
&& {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
`

export const StyledCard = styled(Card)`
&& {
  width: 18rem;
  height: 22rem;
  margin: 2rem;
  border-radius: 1rem;
  box-shadow: 2px 2px 10px ${({ theme }) => theme.gray};
}
`
export const StepFields = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction column;
`;
