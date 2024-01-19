import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';

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
        <App />
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
