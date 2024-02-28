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

const theme = createTheme({
  palette: {
    primary: {
      main: '#074458',
      light: '#074458AB',
    },
  },
});

const App: React.FC = ({}) => {
  const [logged, setLogged] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) navigate('/login');
  }, [logged]);

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
            <Route path="/requerimentos" element={<Requirements />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/calendario" element={<Calendar />} />
            <Route path="/horarios" element={<Schedule />} />
          </Switch>
        </Home>
      )}
    </main>
  );
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>Caregando..</span>}>
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
