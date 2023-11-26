import '@testing-library/jest-dom';
import { cleanup, screen } from '@testing-library/react';

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

afterEach(cleanup);

describe('Results component', () => {
  it('renders is correctly', () => {
    const input = screen.queryByAltText('loading');

    expect(input).not.toBeInTheDocument();
  });
});
