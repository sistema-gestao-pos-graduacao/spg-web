import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { FieldErrors } from 'react-hook-form';

export type RegisterCardProps = {
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      };
    title: string;
    description: string;
    url: string;
};

export type FormDiscipline = {
  curriculum: string;
  discipline: string;
  teacher: string;
  hours: number;
};

export type FormCurriculum = {
  curriculum: string;
  specialization: string;
};

export type StepProps = {
  errors: FieldErrors<FormDiscipline>
  steps: string[];
  step1: React.ReactNode;
  step2: React.ReactNode;
};
