import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import {
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from '../../App';
import Card from '../card/Card';

const mockUseNavigate = jest.fn().mockReturnValue('');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: jest.fn().mockReturnValue({
    pathname: '',
    search: '',
  }),
  useNavigation: jest.fn().mockReturnValue({
    state: '',
  }),
}));
const routerSetting = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="details/:name" element={<Card />} />
  </Route>
);
const routerTest = createMemoryRouter(routerSetting, {
  initialEntries: ['/'],
});

afterEach(cleanup);

describe('Results component', () => {
  it('renders is correctly', () => {
    render(<RouterProvider router={routerTest} />);

    const input = screen.queryByAltText('loading');

    expect(input).not.toBeInTheDocument();
  });
});
