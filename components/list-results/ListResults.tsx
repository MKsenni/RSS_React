import style from './listResults.module.css';
import { useAppSelector } from '../../redux/hooks';
import Link from 'next/link';

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
              {itemsPerPage.map((hero, index) => (
                <li key={index} className={style.link}>
                  <Link href={`details/${hero.name}`}>{hero.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <span>No Results</span>
          )}
        </nav>
      </div>
    </>
  );
}
