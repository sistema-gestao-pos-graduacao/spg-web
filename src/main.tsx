import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './Routes';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/400.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalProvider from './features/shared/components/GlobalProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <Routes />
      </GlobalProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
