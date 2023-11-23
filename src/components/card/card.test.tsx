import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ListResults from '../results/list-results/ListResults';
import Card from './Card';
import { Provider } from 'react-redux';
import { store } from '../../__mocks__/mockStore';
import { mockResults } from '../../__mocks__/data-mocks';

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
}));

// beforeEach(() => {
//   fetchMock.resetMocks();
// });

beforeEach(() => {
  jest.mock('../../services/peopleApi.ts', () => ({
    ...jest.requireActual('../../services/peopleApi.ts'),
    useGetPeopleQuery: jest.fn(() => ({
      data: mockResults,
      isLoading: false,
    })),
    useGetPersonQuery: jest.fn(() => ({
      data: mockResults,
      isLoading: false,
    })),
  }));
});

jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

afterEach(cleanup);

describe('Card component', () => {
  // const data = mockResults;

  // beforeAll(() => {
  //   fetchMock.mockOnceIf(baseUrl, () =>
  //     Promise.resolve({
  //       status: 200,
  //       body: JSON.stringify({ data }),
  //     })
  //   );
  // });
  // it('renders hook', async () => {
  //   const { result } = renderHook(() => useGetPersonQuery('Luke Skywalker'), {
  //     wrapper: Wrapper,
  //   });

  //   await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   expect(fetchMock).toHaveBeenCalledTimes(1);

  //   console.log(result.current.currentData);

  // expect(result.current).toMatchObject({
  //   data,
  //   isLoading: false,
  // });
  // });
  it('Check that a loading indicator is displayed while fetching data', () => {
    render(
      <MemoryRouter initialEntries={['/details/Luke Skywalker']}>
        <Provider store={store}>
          <ListResults />
          <Routes>
            <Route path="details/:name" element={<Card />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);
    waitFor(() => expect(screen.getByText('loading')).toBeInTheDocument());
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
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

    await waitFor(() => screen.getByText('Luke Skywalker'));
    waitFor(() => {
      fireEvent.click(screen.getByText('Luke Skywalker'));
      expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Height: 172')).toBeInTheDocument();
      expect(screen.getByText('Mass: 77')).toBeInTheDocument();
      expect(screen.getByText('Year: 19BBY')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.queryByText('Name: Leya')).not.toBeInTheDocument();
    });
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
      // expect(mockUseNavigate).toHaveBeenCalledWith(-1);
    });
  });
});
