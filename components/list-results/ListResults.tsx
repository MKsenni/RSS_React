import style from './listResults.module.css';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '../../redux/hooks';

export default function ListResults({ children }: PropsWithChildren) {
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
                  <Link
                    href={{
                      pathname: '/details/[name]',
                      query: { name: `${hero.name}` },
                    }}
                  >
                    {hero.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span>No Results</span>
          )}
        </nav>
        {children}
      </div>
    </>
  );
}
