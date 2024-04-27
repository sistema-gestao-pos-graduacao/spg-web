import {
  Route,
  Routes as Switch,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import './App.css';
import './i18n/i18n';
import { Themes } from './features/shared/Shared.consts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularLoading from './features/shared/components/CircularLoading';
import DisciplinesDetails from './features/disciplines/components/DisciplinesDetails';

const Login = lazy(() => import('./features/login/components/Login'));
const Home = lazy(() => import('./features/home/components/Home'));
const Disciplines = lazy(
  () => import('./features/disciplines/components/Disciplines'),
);
const Chat = lazy(() => import('./features/chat/components/Chat'));
const Requirements = lazy(
  () => import('./features/requirements/components/Requirements'),
);
const Calendar = lazy(() => import('./features/calendar/components/Calendar'));
const Schedule = lazy(() => import('./features/schedule/components/Schedule'));
const Registers = lazy(() => import('./features/registers/components/Registers'));
const Curriculum = lazy(() => import('./features/registers/components/Curriculum'));
const Discipline = lazy(() => import('./features/registers/components/Discipline'));
const Teacher = lazy(() => import('./features/registers/components/Teacher'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#074458',
      light: '#074458AB',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) navigate('/login');
  }, [logged, navigate]);

  return (
    <main>
      {!logged ? (
        <Switch>
          <Route path="/login" element={<Login setLogged={setLogged} />} />
        </Switch>
      ) : (
        <Home setLogged={setLogged}>
          <Switch>
            <Route path="/" element={<Disciplines />} />
            <Route path="/disciplina/:id" element={<DisciplinesDetails />} />
            <Route path="/requerimentos" element={<Requirements />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/calendario" element={<Calendar />} />
            <Route path="/horarios" element={<Schedule />} />
            <Route path="/cadastros" element={<Registers />} />
            <Route path="/matriz" element={<Curriculum />} />
            <Route path="/disciplinas" element={<Discipline />} />
            <Route path="/professor" element={<Teacher />} />
          </Switch>
        </Home>
      )}
    </main>
  );
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularLoading />}>
        <ThemeProvider theme={theme}>
          <StyledProvider theme={Themes}>
            <App />
          </StyledProvider>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
