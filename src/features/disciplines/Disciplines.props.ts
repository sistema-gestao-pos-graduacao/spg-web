export interface DisciplineForm {
  discipline: string;
  activesClasses: number;
  period: number;
  code: number;
  objectId: string;

  teacher: string;
  location: string | null;
  building: number | null;
  room: number | null;
  dayWeek: Date;
  time: string;

  considerations: string | null;
  students: string | null;
  curriculum: string | null;
}

export interface FormDataProps {
  label: string;
  edited: boolean;
  key: string;
  type: string;
}
