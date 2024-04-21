import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Themes } from '../../shared/Shared.consts';
import { DisciplinesDetails as S } from '../Disciplines.style';
import { UseFormReturn } from 'react-hook-form';

import { Info } from '@mui/icons-material';
import { DisciplineForm } from '../Disciplines.props';

const DisciplinesStudents: React.FC<{
  form: UseFormReturn<DisciplineForm, any, DisciplineForm>;
  possibleEdit: boolean;
}> = ({ form, possibleEdit }) => {
  const { t } = useTranslation();
  const { register, getValues } = form;

  return (
    <S.StudentsContainer>
      <S.StudentsHeader>
        <Typography fontWeight={700} color={Themes.primary}>
          {t('disciplines.STUDENTS')}
        </Typography>
        {possibleEdit && (
          <Tooltip title={t('disciplines.STUDENTS_TOOLTIP')} placement="right">
            <Info color="primary" fontSize="small" />
          </Tooltip>
        )}
      </S.StudentsHeader>
      {possibleEdit ? (
        <S.TextArea $possibleEdit={true} {...register('students')} />
      ) : (
        <S.StudentsList>
          {(getValues().students ?? '').split(',').map((value) => {
            return (
              value && (
                <li key={value}>
                  <Typography
                    textTransform={'capitalize'}
                    color={Themes.primary}
                  >
                    {value}
                  </Typography>
                </li>
              )
            );
          })}
        </S.StudentsList>
      )}
    </S.StudentsContainer>
  );
};

export default DisciplinesStudents;
