import style from './card.module.css';
import { PersonProps } from '../../lib/data/types';
import {
  getRunningQueriesThunk,
  peopleApi,
  useGetPersonQuery,
} from '../api/peopleApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setLoadingDetailsPage } from '../../redux/slices/loadingFlagsSlice';
import { useEffect } from 'react';
import Spinner from '../../components/spiner/Spinner';
import { useRouter } from 'next/router';
import { wrapper } from '../api/store';
import { GetServerSidePropsContext } from 'next';
import { skipToken } from '@reduxjs/toolkit/query';

export default function Card() {
  const router = useRouter();

  const name = router.query.name;
  const { data, isFetching } = useGetPersonQuery(
    typeof name === 'string' ? name : skipToken,
    {
      skip: router.isFallback,
    }
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoadingDetailsPage(isFetching));
  }, [dispatch, isFetching]);

  const loadingDetailPage = useAppSelector(
    (state) => state.loadingFlags.detailsPageLoading
  );

  const handleClose = (): void => {
    router.back();
  };

  if (loadingDetailPage) return <Spinner />;

  return (
    <>
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
