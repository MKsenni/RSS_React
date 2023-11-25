import '@testing-library/jest-dom';
import ListResults from './ListResults';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../pages/api/store';
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
    state: 'loading',
  }),
}));
afterEach(cleanup);

describe('ListResults component', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <Provider store={store}>
        <ListResults />
      </Provider>
    );

    expect(screen.getByText('No Results')).toBeInTheDocument();
  });
  it('Verify that the component renders the specified number of cards', () => {
    const lengthResults = 6;
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListResults />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(lengthResults);
  });
});
