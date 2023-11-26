import style from './page/index.module.css';
import { useEffect } from 'react';
import ListResults from '../components/list-results/ListResults';
import Pagination from '../components/pagination/Pagination';
import Spinner from '../components/spiner/Spinner';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateItems } from '../redux/slices/itemsPerPageSlice';
import { setLoadingMainPage } from '../redux/slices/loadingFlagsSlice';
import {
  useGetPeopleQuery,
  peopleApi,
  getRunningQueriesThunk,
} from './api/peopleApi';
import { wrapper } from './api/store';
import { INITIAL_PAGE } from '../lib/data/constants';

export default function Page() {
  console.log('render index');
  const page = INITIAL_PAGE;

  const searchWord: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );
  const loadingMainPage = useAppSelector(
    (state) => state.loadingFlags.mainPageLoading
  );
  const { data, isFetching } = useGetPeopleQuery({
    page: typeof page === 'string' ? Number(page) : 1,
    searchWord: searchWord ?? '',
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateItems(data?.results));
  }, [data]);

  useEffect(() => {
    dispatch(setLoadingMainPage(isFetching));
  }, [isFetching]);

  const totalItems = data?.count;
  if (!totalItems) return <Spinner />;
  const totalPage = Math.ceil(totalItems / countPerPage);

  return (
    <section className={style.results}>
      {loadingMainPage ? (
        <Spinner />
      ) : (
        <>
          <ListResults />
          <Pagination totalPage={totalPage} />
        </>
      )}
    </section>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(
      peopleApi.endpoints.getPeople.initiate({
        page: Number(INITIAL_PAGE),
        searchWord: '',
      })
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: {} };
  }
);
