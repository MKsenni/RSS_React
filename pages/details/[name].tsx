import style from './card.module.css';
import { PersonProps } from '../../lib/data/types';
import {
  getRunningQueriesThunk,
  peopleApi,
  useGetPersonQuery,
} from '../api/peopleApi';
import { useRouter } from 'next/router';
import { wrapper } from '../api/store';
import { GetServerSidePropsContext } from 'next';
import { skipToken } from '@reduxjs/toolkit/query';
import ListResults from '../../components/list-results/ListResults';

export default function Card() {
  const router = useRouter();

  const name = router.query.name;
  const { data } = useGetPersonQuery(
    typeof name === 'string' ? name : skipToken,
    {
      skip: router.isFallback,
    }
  );

  const handleClose = (): void => {
    router.back();
  };

  return (
    <>
      <ListResults>
        {data?.results &&
          (data.results.length > 0 ? (
            data.results.map((person: PersonProps, index: number) => (
              <div className={style.card} key={index} data-testid="card">
                <button
                  className={style.button}
                  type="button"
                  onClick={handleClose}
                >
                  X
                </button>
                <div className={style.container}>
                  <span className={style.name}>Name: {person.name}</span>
                  <span className={style.gender}>Gender: {person.gender}</span>
                  <span className={style.birth}>Year: {person.birth_year}</span>
                  <span className={style.mass}>Mass: {person.mass}</span>
                  <span className={style.height}>Height: {person.height}</span>
                </div>
                <span className={style.overlay} onClick={handleClose}></span>
              </div>
            ))
          ) : (
            <span>No Results</span>
          ))}
      </ListResults>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const searchWord = context.params?.name;
    if (typeof searchWord === 'string') {
      store.dispatch(peopleApi.endpoints.getPerson.initiate(searchWord));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return { props: {} };
  }
);
