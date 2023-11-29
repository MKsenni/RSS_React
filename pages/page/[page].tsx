import style from './index.module.css';
import ListResults from '../../components/list-results/ListResults';
import Pagination from '../../components/pagination/Pagination';
import { useAppSelector } from '../../redux/hooks';
import {
  getRunningQueriesThunk,
  peopleApi,
  useGetPeopleQuery,
} from '../api/peopleApi';
import { GetServerSidePropsContext } from 'next/types';
import { wrapper } from '../api/store';
import { useRouter } from 'next/router';

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

  const totalItems = data?.count;
  const totalPage = Math.ceil(totalItems! / countPerPage);

  return (
    <section className={style.results}>
      <>
        <ListResults peopleResults={data?.results} />
        <Pagination totalPage={totalPage} />
      </>
    </section>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const page = context.params?.page;
    const searchWord = context.query.search;

    if (!searchWord && typeof page === 'string') {
      await store.dispatch(
        peopleApi.endpoints.getPeople.initiate({
          page: Number(page),
          searchWord: '',
        })
      );
    }
    if (typeof searchWord === 'string') {
      await store.dispatch(
        peopleApi.endpoints.getPeople.initiate({
          page: 1,
          searchWord: searchWord,
        })
      );
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: {} };
  }
);
