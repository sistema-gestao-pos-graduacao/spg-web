import React, { ReactElement, useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Container, Content } from '../Home.style';
import { ContextProps, StateAction } from '../../shared/Shared.types';
import { StyleSheetManager } from 'styled-components';
import useApi from '../../shared/useApi';
import { CONTEXT_ROUTE } from '../../shared/RoutesURL';
import { GlobalContext } from '../../shared/Context';
import { HttpMethods } from '../../shared/Shared.consts';

const Home: React.FC<{
  children: ReactElement;
  setLogged: StateAction<boolean>;
}> = ({ setLogged, children }) => {
  const { setUserLogged } = useContext<ContextProps>(GlobalContext);
  const { data } = useApi(CONTEXT_ROUTE, HttpMethods.GET);

  useEffect(() => {
    if (data) {
      setUserLogged(data);
    }
  }, [data]);

  return (
    <Container>
      <Navbar setLogged={setLogged} />
      <Sidebar />
      <Content>
        <StyleSheetManager disableCSSOMInjection>{children}</StyleSheetManager>
      </Content>
    </Container>
  );
};

export default Home;
