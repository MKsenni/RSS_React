import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../spiner/Spinner';
import ListResults from './list-results/ListResults';
import { loaderApp } from '../../routes/loaders';
import { useState, useEffect } from 'react';
import { Description } from '../../services/actions';

function Results() {
  const people = useLoaderData() as Awaited<ReturnType<typeof loaderApp>>;

  const [searchResult, setSearchResult] = useState<Description | null>(
    people ? people.results : null
  );

  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('search');

  useEffect(() => {
    if (people) setSearchResult(people.results);
  }, [people]);

  return (
    <section className="results">
      {searching ? <Spinner /> : <ListResults searchResult={searchResult} />}
    </section>
  );
}

export default Results;
