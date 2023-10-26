import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './fetch';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// cache for queries
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
