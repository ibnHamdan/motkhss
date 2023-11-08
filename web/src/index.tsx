import React from 'react';
import ReactDOM from 'react-dom/client';
import mixpanel from 'mixpanel-browser';
import './index.css';
import { App } from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './fetch';
import { ChakraProvider, theme } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
mixpanel.init('e14150d818d46c6c8372318519eb4d62');

// cache for queries
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
