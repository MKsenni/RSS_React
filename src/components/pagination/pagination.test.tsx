import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

const mockUseNavigate = jest.fn().mockReturnValue('');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

afterEach(cleanup);

describe('Pagination component', () => {
  it('renders is correctly', () => {
    render(
      <Provider store={store}>
        <Pagination totalPage={10} />
      </Provider>
    );

    const prevBtn = screen.getByText('prev');
    const nextBtn = screen.getByText('next');
    const select10 = screen.getByText('10');
    const select20 = screen.getByText('20');

    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(select10).toBeInTheDocument();
    expect(select20).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('Make sure the component updates URL query parameter when page changes with searchword', () => {
    render(
      <Provider store={store}>
        <Pagination totalPage={10} />
      </Provider>
    );

    const nextBtn = screen.getByText('next');

    fireEvent.click(nextBtn);
    expect(mockUseNavigate).toHaveBeenCalledWith(
      '?page=2&limit=10&search=searchword'
    );
  });
  it('Make sure the component updates URL query parameter when page changes without searchword', () => {
    render(
      <Provider store={store}>
        <Pagination totalPage={10} />
      </Provider>
    );

    const nextBtn = screen.getByText('next');
    const prevBtn = screen.getByText('prev');

    fireEvent.click(nextBtn);
    expect(mockUseNavigate).toHaveBeenCalledWith('?page=2&limit=10');
    fireEvent.click(nextBtn);
    expect(mockUseNavigate).toHaveBeenCalledWith('?page=3&limit=10');
    fireEvent.click(prevBtn);
    expect(mockUseNavigate).toHaveBeenCalledWith('?page=2&limit=10');
  });
});
