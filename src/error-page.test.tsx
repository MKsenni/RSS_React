import '@testing-library/jest-dom';
import {
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { screen, render, cleanup } from '@testing-library/react';
import ErrorPage from './error-page';
import Card from './components/card/Card';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

jest.mock('@/components/card/Card');
jest.mock('@/App.tsx');

const routerSetting = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route path="details/:name" element={<Card />} />
  </Route>
);
const badRoute = '/wrongroute';
const routerTest = createMemoryRouter(routerSetting, {
  initialEntries: [badRoute],
});

afterEach(cleanup);

describe('ErrorPage component', () => {
  it('rendering if request is invalid with ErrorResponse', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={routerTest} />
      </Provider>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
