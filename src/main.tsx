import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h2>Something went wrong</h2>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
