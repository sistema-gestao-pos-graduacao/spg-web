import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Dayjs } from 'dayjs';
import { StateAction } from '../shared/Shared.types';

export type RegisterCardProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  title: string;
  description: string;
  url: string;
};

export type FormDiscipline = Disciplines[];

export type Disciplines = {
  name?: string;
  teacherId?: string;
  numberOfClasses?: string;
  prevId?: number;
};

export type StepProps = {
  activeStep: number;
  setActiveStep: StateAction<number>;
  steps: string[];
  step1: React.ReactNode;
  step2: React.ReactNode;
  onSubmit: () => void;
  isValid: boolean[];
  isLoading: boolean;
  clearForm: () => void;
};

export type FormCurriculum = {
  courseId: number;
  name: string;
};

export type FormTeacher = {
  name: string;
  email: string;
  personType: number;
  cpf?: string;
  birthDate?: Dayjs | null;
};

export type CurriculomResponseProps = {
  id: number;
  name: string;
  courseId: number;
  course: string;
};

export type FormClass = {
  courseId: number;
};
