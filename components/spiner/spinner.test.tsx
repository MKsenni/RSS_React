import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('renders correctly', () => {
    const { queryByAltText } = render(<Spinner />);

    const spinner = queryByAltText('loading');

    expect(spinner).toBeInTheDocument();
  });
});
