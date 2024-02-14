import React, { ReactElement } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Container, Content } from '../Home.style';
import { StateAction } from '../../shared/Shared.types';

const Home: React.FC<{
  children: ReactElement;
  setLogged: StateAction<boolean>;
}> = ({ children, setLogged }) => {
  return (
    <Container>
      <Navbar setLogged={setLogged} />
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
};

export default Home;
