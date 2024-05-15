import { SubjectsResponseProps } from '../shared/Shared.types';

export interface DisciplineForm
  extends Omit<SubjectsResponseProps, 'students'> {
  students: string | null;
}

export interface FormDataProps {
  label: string;
  edited: boolean;
  key: string;
  type: string;
}
