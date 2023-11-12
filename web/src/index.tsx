import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './fetch';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

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
