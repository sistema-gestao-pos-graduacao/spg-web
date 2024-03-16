import React from 'react';
import { LogoStyle as S } from '../Shared.style';
import { useTranslation } from 'react-i18next';

const Logo: React.FC<{
  position?: string;
  titleSize?: string;
  lineHeight?: string;
  subTitleSize?: string;
}> = ({ lineHeight, position, subTitleSize, titleSize }) => {
  const { t } = useTranslation();
  return (
    <S.Content $position={position}>
      <S.Title $titleSize={titleSize} $lineHeight={lineHeight}>
        {t('shared.TITLE')}
      </S.Title>
      <S.SubtitleContent>
        <S.Subtitle $subTitleSize={subTitleSize}>
          {t('shared.SUBTITLE_PRIMARY')}
        </S.Subtitle>
        <S.Subtitle $subTitleSize={subTitleSize}>
          {t('shared.SUBTITLE_SECONDARY')}
        </S.Subtitle>
      </S.SubtitleContent>
    </S.Content>
  );
};

export default Logo;
