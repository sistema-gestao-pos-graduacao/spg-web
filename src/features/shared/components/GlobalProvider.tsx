import { ReactNode, useMemo, useState } from 'react';
import { GlobalContext } from '../Context';
import { ErrorProps, UserLoggedProps } from '../Shared.types';
import { DefaultError, Roles } from '../Shared.consts';

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiError, setApiError] = useState<ErrorProps>(DefaultError);
  const [userLogged, setUserLogged] = useState<UserLoggedProps | null>(null);

  const visionMode = useMemo(() => {
    const { ADMIN, COORDINATOR, TEACHER } = Roles;
    if (
      userLogged?.roles.includes(ADMIN) ||
      userLogged?.roles.includes(COORDINATOR)
    )
      return COORDINATOR;
    return TEACHER;
  }, [userLogged]);

  const contextValue = useMemo(
    () => ({
      apiError,
      setApiError,
      userLogged,
      setUserLogged,
      visionMode,
    }),
    [apiError, userLogged],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
