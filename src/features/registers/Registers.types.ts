import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Dayjs } from 'dayjs';

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
  disciplines: Disciplines[]
};

export type Disciplines = {
  discipline: string;
  teacher: string;
  hours: Dayjs | null;
};

export type StepProps = {
  steps: string[];
  step1: React.ReactNode;
  step2: React.ReactNode;
  onSubmit: () => void;
  isValid: boolean;
};

export type FormCurriculum = {
  specialization: string;
  curriculum: string;
};

export type FormTeacher = {
  name: string;
  email: string;
  cpf?: string;
  birthDate?: Dayjs | null;
};