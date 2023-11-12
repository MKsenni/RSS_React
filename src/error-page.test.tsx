import '@testing-library/jest-dom';
import { ErrorResponse, MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen, render, waitFor, cleanup } from '@testing-library/react';
import ErrorPage from './error-page';
import Card from './components/card/Card';

jest.mock('@/components/card/Card');

const mockUseRouteError = jest.fn();
const mockIsRouteErrorResponse = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: () => mockUseRouteError,
  isRouteErrorResponse: () => mockIsRouteErrorResponse,
}));

afterEach(cleanup);

describe('ErrorPage component', () => {
  it('rendering if request is invalid without ErrorResponse', () => {
    const badRoute = '/wrongroute';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routes>
          <Route path="/wrongroute" element={<ErrorPage />}>
            <Route path="details/:name" element={<Card />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const text = screen.getByText('Something went wrong!');
    expect(text).toBeInTheDocument();
  });
  it('rendering if request is invalid with ErrorResponse', async () => {
    const mockError: ErrorResponse = {
      status: 404,
      statusText: 'Not Found',
      data: {
        message: 'Any text',
      },
    };
    mockUseRouteError.mockReturnValue(mockError);
    mockIsRouteErrorResponse.mockResolvedValue(mockError);
    const badRoute = '/wrongroute';

    await waitFor(() => {
      render(
        <MemoryRouter initialEntries={[badRoute]}>
          <Routes>
            <Route path="/wrongroute" element={<ErrorPage />}>
              <Route path="details/:name" element={<Card />} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByTestId('error-status')).toBeInTheDocument();
    expect(screen.getByTestId('error-text')).toBeInTheDocument();
  });
});
