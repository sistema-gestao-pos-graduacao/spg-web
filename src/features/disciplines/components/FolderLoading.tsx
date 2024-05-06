import React from 'react';
import { Folder as S } from '../Disciplines.style';
import { Skeleton } from '@mui/material';
import { Themes } from '../../shared/Shared.consts';

const FolderLoading: React.FC = () => {
  return (
    <S.Container style={{ pointerEvents: 'none', boxShadow: 'none' }}>
      <S.Left
        $cardColor={Themes.white}
        style={{ padding: '0', overflow: 'hidden' }}
      >
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={'100%'}
          sx={{ animationDuration: '1.5s' }}
        />
      </S.Left>
      <S.Upper
        $cardColor={Themes.white}
        style={{ padding: '0', overflow: 'hidden' }}
      >
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={'100%'}
          sx={{ animationDuration: '1.5s' }}
        />
      </S.Upper>
      <S.Content
        $cardColor={Themes.white}
        style={{ padding: '0', overflow: 'hidden' }}
      >
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={'100%'}
          sx={{ animationDuration: '1.5s' }}
        />
      </S.Content>
    </S.Container>
  );
};

export default FolderLoading;
