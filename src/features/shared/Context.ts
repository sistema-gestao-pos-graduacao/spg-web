import { createContext } from 'react';
import { ContextProps } from './Shared.types';
import { DefaultError, Roles } from './Shared.consts';

export const GlobalContext = createContext<ContextProps>({
  apiError: DefaultError,
  setApiError: () => {},
  userLogged: null,
  setUserLogged: () => {},
  visionMode: Roles.TEACHER,
});
