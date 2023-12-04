import ErrorPage from './error-page.tsx';
import App from './App.tsx';
import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom';
import HookForm from './components/hookForm/HookForm.tsx';
import UncontrolledForm from './components/uncontrolledForm/UncontrolledForm.tsx';

export const routerSetting = createRoutesFromElements(
  <>
    <Route path="/" element={<App />} errorElement={<ErrorPage />} />
    <Route path="useHookForm" element={<HookForm />} />
    <Route path="uncontrolledElements" element={<UncontrolledForm />} />
  </>
);

export const router = createBrowserRouter(routerSetting);
