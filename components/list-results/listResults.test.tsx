import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import ListResults from './ListResults';
import { Provider } from 'react-redux';
import { store } from '../../__mocks__/mockStore';

afterEach(cleanup);

describe('ListResults component', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <Provider store={store}>
        <ListResults />
      </Provider>
    );

    expect(screen.getByText('No Results')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(0);
  });
});
