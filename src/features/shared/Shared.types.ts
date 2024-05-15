import { Dispatch, SetStateAction } from 'react';
import { Roles } from './Shared.consts';

export type StateAction<T> = Dispatch<SetStateAction<T>>;

export type ModeTypes = 'teacher' | 'coordinator';
export interface UserLoggedProps {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  personId: number;
}

export interface ErrorProps {
  isError: boolean;
  errorMessage: string;
}

export type VisionModeType = Roles.ADMIN | Roles.COORDINATOR | Roles.TEACHER;

export interface ContextProps {
  apiError: ErrorProps;
  setApiError: StateAction<ErrorProps>;
  userLogged: UserLoggedProps | null;
  setUserLogged: StateAction<UserLoggedProps | null>;
  visionMode: VisionModeType;
}

export interface PersonResponseProps {
  cpf: string;
  id: number;
  userId: string;
  name: string;
  birthDate: string;
  personType: number;
  email: string;
}

export interface CoursesResponseProps {
  id: number;
  name: string;
  coordinatorId: number;
  coordinator: string;
}

export interface SubjectsResponseProps {
  id: number;
  name: string;
  curriculumId: number;
  curriculumName: string;
  teacherId: number;
  teacherName: string;
  numberOfClasses: number;
  location: string;
  building: string;
  room: string;
  considerations: string;
  students: string[];
  weekDay: number;
  syllabus: string;
  color: string;
}

export interface ContextResponseProps {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  personId: number;
}

export interface TeacherResponseProps {
  id: number;
  teacherId: number;
  teacherName: string;
  startDateTime: string;
  endDateTime: string;
  color: string;
}

export interface ScheduleResponseProps {
  id: number;
  teacherId: number;
  teacherName: string;
  subjectId: number;
  subjectName: string;
  startDateTime: string;
  endDateTime: string;
  color: string;
}
export interface AvailableResponseProps {
  id: number;
  teacherId: number;
  teacherName: string;
  startDateTime: string;
  endDateTime: string;
  color: string;
}

export interface ClassResponseProps {
  id: number;
  curriculumId: number;
  curriculumName: string;
  name: string;
  students: [];
}
