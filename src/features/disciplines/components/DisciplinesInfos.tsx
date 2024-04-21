import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Themes } from '../../shared/Shared.consts';
import { DisciplinesDetails as S } from '../Disciplines.style';

import { DisciplineForm, FormDataProps } from '../Disciplines.props';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { UseFormReturn } from 'react-hook-form';

const DisciplinesInfos: React.FC<{
  form: UseFormReturn<DisciplineForm, any, DisciplineForm>;
  formData: FormDataProps[];
  possibleEdit: boolean;
}> = ({ form, formData, possibleEdit }) => {
  const { t } = useTranslation();
  const { register, watch } = form;
  const valueFormat = (key: string | Date | null) => {
    const value = watch(key as keyof DisciplineForm);
    if (value) {
      if (typeof value === 'string' || typeof value === 'number') return value;
      return format(value, 'EEEE', { locale: ptBR });
    }
    return '';
  };

  return (
    <S.DetailsContainer>
      <S.InfoContent>
        {formData.map(({ label, edited, key, type }) => (
          <S.InfoItem key={label}>
            <Typography
              color="primary"
              fontWeight={700}
            >{`${label}: `}</Typography>
            {!edited || !possibleEdit ? (
              <Typography
                textTransform={'capitalize'}
                textOverflow="ellipsis"
                overflow="hidden"
                color="primary"
              >
                {valueFormat(key)}
              </Typography>
            ) : (
              <S.Input
                $possibleEdit={edited && possibleEdit}
                type={type}
                size={1}
                style={{
                  width: `${(watch(key as keyof DisciplineForm) ?? 0).toString().length + 3}ch`,
                }}
                {...register(key as keyof DisciplineForm)}
              />
            )}
          </S.InfoItem>
        ))}
      </S.InfoContent>
      <S.Considerations>
        <Typography fontWeight={700} color={Themes.primary}>
          {`${t('disciplines.CONSIDERATIONS')}: `}
        </Typography>
        <S.TextArea
          $possibleEdit={possibleEdit}
          disabled={!possibleEdit}
          {...register('considerations')}
        />
      </S.Considerations>
    </S.DetailsContainer>
  );
};

export default DisciplinesInfos;
