import '@testing-library/jest-dom';
import { ResultsPeopleContext } from '../../../context';
import ListResults from './ListResults';
import { cleanup, render, screen } from '@testing-library/react';
import { mockResults } from '../../../data/data-mocks';
import { MemoryRouter } from 'react-router-dom';

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
      <ResultsPeopleContext.Provider value={null}>
        <ListResults />
      </ResultsPeopleContext.Provider>
    );

    expect(screen.getByText('No Results')).toBeInTheDocument();
  });
  it('Verify that the component renders the specified number of cards', () => {
    const lengthResults = 6;
    render(
      <MemoryRouter>
        <ResultsPeopleContext.Provider value={mockResults}>
          <ListResults />
        </ResultsPeopleContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(lengthResults);
  });
});
