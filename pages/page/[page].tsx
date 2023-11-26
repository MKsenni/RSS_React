import style from './index.module.css';
import ListResults from '../../components/list-results/ListResults';
import Pagination from '../../components/pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateItems } from '../../redux/slices/itemsPerPageSlice';
import {
  getRunningQueriesThunk,
  peopleApi,
  useGetPeopleQuery,
} from '../api/peopleApi';
import Spinner from '../../components/spiner/Spinner';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { wrapper } from '../api/store';

export default function Page() {
  const router = useRouter();
  const page = router.query.page;

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
  if (!totalItems) return <Spinner />;
  const totalPage = Math.ceil(totalItems / countPerPage);

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
  (store) => async (context: GetServerSidePropsContext) => {
    const page = context.params?.page;
    const searchWord = context.params?.search;
    if (!searchWord && typeof page === 'string') {
      store.dispatch(
        peopleApi.endpoints.getPeople.initiate({
          page: Number(page),
          searchWord: '',
        })
      );
    }
    if (typeof searchWord === 'string' && typeof page === 'string') {
      store.dispatch(
        peopleApi.endpoints.getPeople.initiate({
          page: Number(page),
          searchWord: searchWord,
        })
      );
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: {} };
  }
);
