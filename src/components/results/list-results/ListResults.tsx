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
      <div className="list-results">
        <nav className="navigation">
          {searchResult?.length ? (
            <ul className="cards-list">
              {searchResult.map((hero, index) => (
                <li key={index} className="card-link">
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
          <div id="detail">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
