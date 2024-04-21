import React, { ReactElement } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Container, Content } from '../Home.style';
import { StateAction } from '../../shared/Shared.types';
import { StyleSheetManager } from 'styled-components';

const Home: React.FC<{
  children: ReactElement;
  setLogged: StateAction<boolean>;
}> = ({ setLogged, children }) => {
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
