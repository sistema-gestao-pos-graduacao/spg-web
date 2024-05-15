import React from 'react';
import { CardContent, Typography } from '@mui/material';
import * as S from '../Registers.style';
import { useNavigate } from 'react-router-dom';
import { RegisterCardProps } from '../Registers.types';

const RegisterCard = ({ icon, title, description, url }: RegisterCardProps) => {
  const navigate = useNavigate();

  return (
    <S.StyledCard>
      <S.StyledCardAction onClick={() => navigate(`/${url}`)}>
        <S.CardIcon>{React.createElement(icon)}</S.CardIcon>

        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align="center"
            style={{ height: '5rem' }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </S.StyledCardAction>
    </S.StyledCard>
  );
};

export default RegisterCard;
