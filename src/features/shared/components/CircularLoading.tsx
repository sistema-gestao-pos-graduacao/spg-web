import { CircularProgress } from '@mui/material';
import React from 'react';
import { CircularLoadingContent } from './../Shared.style';

const CircularLoading: React.FC<{ width?: string }> = ({ width }) => {
  return (
    <CircularLoadingContent width={width}>
      <CircularProgress color="primary" />
    </CircularLoadingContent>
  );
};

export default CircularLoading;
