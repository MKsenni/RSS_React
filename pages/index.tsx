import style from './page/index.module.css';
import { useEffect } from 'react';
import ListResults from '../components/list-results/ListResults';
import Pagination from '../components/pagination/Pagination';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateItems } from '../redux/slices/itemsPerPageSlice';
import {
  useGetPeopleQuery,
  peopleApi,
  getRunningQueriesThunk,
} from './api/peopleApi';
import { wrapper } from './api/store';
import { INITIAL_PAGE } from '../lib/data/constants';

export default function Page() {
  const page = INITIAL_PAGE;

  const searchWord: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );
  const { data } = useGetPeopleQuery({
    page: typeof page === 'string' ? Number(page) : 1,
    searchWord: searchWord ?? '',
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateItems(data?.results));
  }, [data]);

  const totalItems = data?.count;
  const totalPage = Math.ceil(totalItems! / countPerPage);

  return (
    <section className={style.results}>
      <>
        <ListResults />
        <Pagination totalPage={totalPage} />
      </>
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
