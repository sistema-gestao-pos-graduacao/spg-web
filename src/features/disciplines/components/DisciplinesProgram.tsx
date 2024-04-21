import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Themes } from '../../shared/Shared.consts';
import { DisciplinesDetails as S } from '../Disciplines.style';
import { UseFormReturn } from 'react-hook-form';

import { DisciplineForm } from '../Disciplines.props';

const DisciplinesProgram: React.FC<{
  form: UseFormReturn<DisciplineForm, any, DisciplineForm>;
  possibleEdit: boolean;
}> = ({ form, possibleEdit }) => {
  const { t } = useTranslation();
  const { register } = form;

  return (
    <S.ProgramContainer>
      <Typography fontWeight={700} color={Themes.primary}>
        {t('disciplines.COURSE_PROGRAM')}
      </Typography>
      <S.TextArea
        $possibleEdit={possibleEdit}
        disabled={!possibleEdit}
        {...register('courseProgram')}
      />
    </S.ProgramContainer>
  );
};

export default DisciplinesProgram;
