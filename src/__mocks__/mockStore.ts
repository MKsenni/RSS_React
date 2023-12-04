import configureStore from 'redux-mock-store';
import { mockPerson } from './data-mocks';

const mockStore = configureStore([]);

export const store = mockStore({
  itemsPerPage: { itemsPerPage: mockPerson },
  loadingFlags: {
    detailsPageLoading: false,
    mainPageLoading: false,
  },
  currentPage: {
    pageNum: 1,
    countPerPage: 10,
  },
  searchWord: { searchWord: '' },
});

store.getState();
