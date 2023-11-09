import { NavLink, Outlet, useNavigation } from 'react-router-dom';
import { Description } from '../../../services/actions';
import Spinner from '../../spiner/Spinner';

function ListResults({ searchResult }: { searchResult: Description | null }) {
  const navigation = useNavigation();

  return (
    <>
      <nav className="navigation">
        {searchResult?.length ? (
          <ul className="cards-list">
            {searchResult.map((hero, index) => (
              <li key={index} className="card-link">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                  to={`details/${hero.name}`}
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
    </>
  );
}

export default ListResults;
