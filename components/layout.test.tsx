import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

describe('Layout component', () => {
  it('renders is correctly', () => {
    // render(
    //   <Provider store={store}>
    //     <Layout children={} />
    //   </Provider>
    // );

    const input = screen.getByRole('searchbox');
    const title = screen.getByText('Star Wars');

    expect(input).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
