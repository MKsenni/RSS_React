import ErrorPage from './error-page.tsx';
import App from './App.tsx';
import { loaderApp as rootLoader } from './routes/loaders.ts';
import Card from './components/card/Card.tsx';
import { loaderCard as heroloader } from './routes/loaders.ts';
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom';

export const routerSetting = createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
    errorElement={<ErrorPage />}
    loader={rootLoader}
  >
    <Route path="details/:name" element={<Card />} loader={heroloader} />
  </Route>
);

export const router = createBrowserRouter(routerSetting);
