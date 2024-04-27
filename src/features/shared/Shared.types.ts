import { Dispatch, SetStateAction } from 'react';
import { Roles } from './Shared.consts';

export type StateAction<T> = Dispatch<SetStateAction<T>>;

export type ModeTypes = 'teacher' | 'coordinator';
export interface UserLoggedProps {
  userId: string;
  username: string;
  email: string;
  roles: string[];
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
