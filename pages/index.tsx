import style from './page/index.module.css';
import ListResults from '../components/list-results/ListResults';
import Pagination from '../components/pagination/Pagination';
import { useAppSelector } from '../redux/hooks';
import {
  peopleApi,
  getRunningQueriesThunk,
  useGetPeopleQuery,
} from './api/peopleApi';
import { wrapper } from './api/store';
import { INITIAL_PAGE } from '../lib/data/constants';
import { GetServerSidePropsContext } from 'next';

export default function Page() {
  const page = INITIAL_PAGE;

  const searchWord: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );

  const { data } = useGetPeopleQuery({
    page: page,
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
    const searchWord = context.query.search;

    if (typeof searchWord === 'string') {
      await store.dispatch(peopleApi.endpoints.getPerson.initiate(searchWord));
    }
    if (!searchWord) {
      await store.dispatch(
        peopleApi.endpoints.getPeople.initiate({
          page: INITIAL_PAGE,
          searchWord: '',
        })
      );
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: {} };
  }
);
