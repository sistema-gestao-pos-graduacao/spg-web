import { CircularProgress } from '@mui/material';
import React from 'react';
import { CircularLoadingContent } from './../Shared.style';

const CircularLoading: React.FC = () => {
  return (
    <CircularLoadingContent>
      <CircularProgress color="primary" />
    </CircularLoadingContent>
  );
};

export default CircularLoading;
