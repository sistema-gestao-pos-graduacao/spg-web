import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import './i18n/i18n';
import { Themes } from './features/shared/shared.consts';

const Login = lazy(() => import('./features/login/components/Login'));

const App: React.FC = () => {
  return (
    <main>
      <Switch>
        <Route path="/" element={<Login />} />
      </Switch>
    </main>
  );
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>Caregando...</span>}>
        <ThemeProvider theme={Themes}>
          <App />
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
