import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from './404';

describe('Not found page', () => {
  it('renders 404 page', () => {
    render(<NotFound />);

    const notFound = screen.getByText('404 - Page Not Found');

    expect(notFound).toBeInTheDocument();
  });
  it('returns to previous page on Go back click', () => {
    render(<NotFound />);

    const back = screen.getByText('Go back to home');
    fireEvent.click(back);
  });
});
