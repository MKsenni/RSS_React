import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../pages/api/store';
import Search from './search';

afterEach(cleanup);

describe('Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Luke' } });
    fireEvent.click(input);

    expect(input).toHaveAttribute('value', 'LUKE');
  });
  it('retrieves the value from the local storage upon mounting', async () => {
    global.localStorage.setItem('searchWord', 'Luke');
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchWord = screen.getByDisplayValue('LUKE');

    await waitFor(() => {
      expect(searchWord).toBeVisible();
    });
  });
});
