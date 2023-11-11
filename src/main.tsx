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
import App from './App.tsx';
import { loaderApp as rootLoader } from './routes/loaders.ts';
import Card from './components/card/Card.tsx';
import { loaderCard as heroloader } from './routes/loaders.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement={<ErrorPage />}
      loader={rootLoader}
    >
      <Route errorElement={<ErrorPage />}>
        <Route path="details/:name" element={<Card />} loader={heroloader} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
