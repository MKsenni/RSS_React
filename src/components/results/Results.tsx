import style from './results.module.css';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../spiner/Spinner';
import ListResults from './list-results/ListResults';
import { loaderApp } from '../../routes/loaders';
import Pagination from '../pagination/Pagination';
import { ResultsPeopleContext } from '../../context';

export default function Results() {
  const people = useLoaderData() as Awaited<ReturnType<typeof loaderApp>>;

  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('search');

  return (
    <section className={style.results}>
      {searching ? (
        <Spinner />
      ) : (
        <>
          <ResultsPeopleContext.Provider value={people ? people : null}>
            <ListResults />
            <Pagination />
          </ResultsPeopleContext.Provider>
        </>
      )}
    </section>
  );
}
