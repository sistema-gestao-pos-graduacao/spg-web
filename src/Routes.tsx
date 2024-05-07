import {
  Route,
  Routes as Switch,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom';
import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';
import './App.css';
import './i18n/i18n';
import { Themes } from './features/shared/Shared.consts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularLoading from './features/shared/components/CircularLoading';
import DisciplinesDetails from './features/disciplines/components/DisciplinesDetails';
import { GlobalContext } from './features/shared/Context';
import { Grow, Snackbar, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { ToastError } from './features/shared/Shared.style';

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
const Registers = lazy(
  () => import('./features/registers/components/Registers'),
);
const Curriculum = lazy(
  () => import('./features/registers/components/Curriculum'),
);
const Discipline = lazy(
  () => import('./features/registers/components/Discipline'),
);
const Teacher = lazy(() => import('./features/registers/components/Teacher'));
const Class = lazy(() => import('./features/registers/components/Class'));  

const theme = createTheme({
  palette: {
    primary: {
      main: '#074458',
      light: '#074458AB',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#AD0000',
    },
  },
});

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const navigate = useNavigate();

  const { apiError, setApiError } = useContext(GlobalContext);

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
            <Route path="/turma" element={<Class />} />
          </Switch>
        </Home>
      )}
      <Snackbar
        open={apiError.isError}
        autoHideDuration={3e3}
        onClose={() => setApiError({ errorMessage: '', isError: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Grow}
      >
        <ToastError>
          <ErrorOutline color="secondary" />
          <Typography fontSize=".9rem" color="secondary">
            {apiError.errorMessage}
          </Typography>
        </ToastError>
      </Snackbar>
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
