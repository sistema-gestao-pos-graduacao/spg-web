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

export type FormDiscipline = Disciplines[];

export type Disciplines = {
  curriculumId: number;
  name: string;
  teacherId: number;
  hours: number;
};

export type StepProps = {
  steps: string[];
  step1: React.ReactNode;
  step2: React.ReactNode;
  onSubmit: () => void;
  isValid: boolean[];
  isLoading: boolean;
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

export interface CurriculomResponseProps {
  id: number;
  name: string;
  courseId: number;
  course: string;
}
