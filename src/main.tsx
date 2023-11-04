import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorPage from './error-page.tsx';
import App from './routes/App.tsx';
import { loaderApp as rootLoader } from './routes/loaders.ts';
import Card from './routes/Card.tsx';
import { loaderCard as heroloader } from './routes/loaders.ts';
import Index from './routes/index.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/RSS_React"
      element={<App />}
      errorElement={<ErrorPage />}
      loader={rootLoader}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="heroes/:name" element={<Card />} loader={heroloader} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
