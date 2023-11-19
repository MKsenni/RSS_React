import style from './listResults.module.css';
import { Outlet } from 'react-router-dom';
import CardResults from './card-results/CardResults';
import { useAppSelector } from '../../../redux/hooks';

export default function ListResults() {
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
        <div className={style.detail}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
