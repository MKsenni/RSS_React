import style from './listResults.module.css';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../../spiner/Spinner';
import { useContext, useEffect, useState } from 'react';
import { ResultsPeopleContext } from '../../../context';
import { PeopleResponse } from '../../../services/actions';
import CardResults from './card-results/CardResults';

export default function ListResults() {
  const people: PeopleResponse | null = useContext(ResultsPeopleContext);
  const [searchResult, setSearchResult] = useState(people?.results);
  const navigation = useNavigation();

  useEffect(() => {
    setSearchResult(people?.results);
  }, [people]);

  return (
    <>
      <div className={style.list}>
        <nav className={style.navigation}>
          {searchResult?.length ? (
            <ul className={style.cards}>
              {searchResult.map((hero, index) => {
                return <CardResults key={index} hero={hero} />;
              })}
            </ul>
          ) : (
            <span>No Results</span>
          )}
        </nav>
        {navigation.state === 'loading' ? (
          <Spinner />
        ) : (
          <div className={style.detail}>
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
