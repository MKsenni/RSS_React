import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <h2 data-testid="error-status">{error.status}</h2>
        <p data-testid="error-text">{error.statusText}</p>
        {error.data?.message && (
          <p data-testid="error-message">{error.data.message}</p>
        )}
      </div>
    );
  } else {
    return <h2>Something went wrong!</h2>;
  }
}
