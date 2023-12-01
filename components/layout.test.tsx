import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { store } from '../pages/api/store';
import { Provider } from 'react-redux';

describe('Layout component', () => {
  it('renders is correctly', () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    const input = screen.getByRole('searchbox');
    const title = screen.getByText('Star Wars');

    expect(input).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
