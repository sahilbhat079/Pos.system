// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { Provider } from "react-redux";
// import { store } from "./store/store.ts";
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </StrictMode>,
// )


// index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react"
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

      <SnackbarProvider autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
      </PersistGate>
    </Provider>
  // </StrictMode>
);
