import ErrorPage from './error-page.tsx';
import App from './App.tsx';
import Card from './components/card/Card.tsx';
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom';

export const routerSetting = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route path="details/:name" element={<Card />} />
  </Route>
);

export const router = createBrowserRouter(routerSetting);
