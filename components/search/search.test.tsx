import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
// import { store } from '../pages/api/store';
// import { Provider } from 'react-redux';
// import Layout from './layout';

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

describe('Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    // render(
    //   <Provider store={store}>
    //     <Layout children={} />
    //   </Provider>
    // );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(input);

    expect(input).toHaveAttribute('value', 'LUKE');
  });
  it('retrieves the value from the local storage upon mounting', async () => {
    global.localStorage.setItem('searchWord', 'Luke');
    // render(
    //   <Provider store={store}>
    //     <Layout children={} />
    //   </Provider>
    // );

    const searchWord = screen.getByDisplayValue('LUKE');

    await waitFor(() => {
      expect(searchWord).toBeVisible();
    });
  });
});
