import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from '../../App';
import ErrorPage from '../../error-page';
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
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route path="details/:name" element={<Card />} />
  </Route>
);
const routerTest = createMemoryRouter(routerSetting, {
  initialEntries: ['/'],
});

afterEach(cleanup);

describe('Search component', () => {
  it('renders is correctly', () => {
    render(<RouterProvider router={routerTest} />);

    const input = screen.getByRole('searchbox');
    const title = screen.getByText('Star Wars');

    expect(input).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(<RouterProvider router={routerTest} />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(input);

    expect(input).toHaveAttribute('value', 'LUKE');
  });
  it('retrieves the value from the local storage upon mounting', async () => {
    global.localStorage.setItem('searchWord', 'Luke');
    render(<RouterProvider router={routerTest} />);

    const searchWord = screen.getByDisplayValue('LUKE');

    await waitFor(() => {
      expect(searchWord).toBeVisible();
    });
  });
});
