import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Page from './[page]';

afterEach(cleanup);

describe('Results component', () => {
  it('renders is correctly', () => {
    render(<Page />);
    const input = screen.queryByAltText('loading');

    expect(input).not.toBeInTheDocument();
  });
});
