import style from './listResults.module.css';
import { NavLink, Outlet, useLocation, useNavigation } from 'react-router-dom';
import Spinner from '../../spiner/Spinner';
import { useEffect, useState } from 'react';
import { PersonProps } from '../../../services/actions';

export default function ListResults({
  searchResult: people,
}: {
  searchResult: PersonProps[] | null;
}) {
  const [searchResult, setSearchResult] = useState(people);
  const navigation = useNavigation();

  const { search } = useLocation();

  useEffect(() => {
    setSearchResult(people);
  }, [people]);

  return (
    <>
      <div className={style.list}>
        <nav className={style.navigation}>
          {searchResult?.length ? (
            <ul className={style.cards}>
              {searchResult.map((hero, index) => (
                <li key={index} className={style.link}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                    to={`details/${hero.name}` + search}
                  >
                    {hero.name ? <>{hero.name}</> : <span>No Name</span>}
                  </NavLink>
                </li>
              ))}
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
