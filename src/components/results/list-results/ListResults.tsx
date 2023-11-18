import style from './listResults.module.css';
import { Outlet, useNavigation } from 'react-router-dom';
import Spinner from '../../spiner/Spinner';
import CardResults from './card-results/CardResults';
import { useAppSelector } from '../../../redux/hooks';

export default function ListResults() {
  const navigation = useNavigation();

  const itemsPerPage = useAppSelector(
    (state) => state.itemsPerPage.itemsPerPage
  );

  return (
    <>
      <div className={style.list}>
        <nav className={style.navigation}>
          {itemsPerPage?.length ? (
            <ul className={style.cards}>
              {itemsPerPage.map((hero, index) => {
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
