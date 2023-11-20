import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mockResults } from '../../../../data/data-mocks';
import ListResults from '../ListResults';
import Card from '../../../card/Card';
import { store } from '../../../../redux/store';
import { Provider } from 'react-redux';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
  useLocation: jest.fn().mockReturnValue({
    pathname: 'details/Luke Skywalker',
    search: '',
  }),
  useNavigation: jest.fn().mockReturnValue({
    state: '',
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
  loaderCard: jest.fn().mockReturnValue({
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

afterEach(cleanup);

describe('CardResults component', () => {
  it('Ensure that the card component renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListResults />
        </MemoryRouter>
      </Provider>
    );

    mockResults.results.forEach((people) => {
      expect(screen.getByText(people.name)).toBeInTheDocument();
    });
  });
  it('Validate that clicking on a card opens a detailed card component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListResults />
          <Routes>
            <Route path="details/Luke Skywalker" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
});
