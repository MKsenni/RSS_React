import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { mockResults } from '../../data/data-mocks';
import ListResults from '../results/list-results/ListResults';
import Card from './Card';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: jest.fn().mockReturnValue({
    pathname: 'details/Luke Skywalker',
    search: '',
  }),
  useNavigation: jest.fn().mockReturnValue({
    state: 'loading',
  }),
  useLoaderData: jest.fn().mockReturnValue({
    count: 82,
    next: 'https://swapi.dev/api/people/?page=2',
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
        gender: 'male',
      },
    ],
  }),
}));

const mockuseGetPersonQuerys = jest.fn().mockReturnValue({
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  gender: 'male',
});
beforeAll(() => {
  jest.mock('../../services/peopleApi.ts', () => ({
    pokemonAPI: {
      useGetPeopleQuery: jest
        .fn()
        .mockReturnValue({ data: mockResults, isLoading: false }),
      useGetPersonQuery: () => mockuseGetPersonQuerys,
    },
  }));
});

afterEach(cleanup);

describe('Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <ListResults />
          <Routes>
            <Route path="details/:name" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });
  it('Make sure the detailed card component correctly displays the detailed card data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);
    expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77')).toBeInTheDocument();
    expect(screen.getByText('Year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.queryByText('Name: Leya')).not.toBeInTheDocument();
  });
  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
          <ListResults />
          <Routes>
            <Route path="details/:name" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const closeBtn = screen.getByRole('button', { name: 'X' });
    expect(closeBtn).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(closeBtn);
      expect(mockUseNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
