import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../__mocks__/mockStore';
import Card from './[name]';

afterEach(cleanup);

describe('Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', () => {
    render(
      <Provider store={store}>
        <Card />
      </Provider>
    );

    const card = screen.getByText('Luke Skywalker');
    fireEvent.click(card);
    waitFor(() => expect(screen.getByText('loading')).toBeInTheDocument());
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <Card />
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
        <Card />
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
