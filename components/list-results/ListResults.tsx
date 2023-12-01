import style from './listResults.module.css';
import Link from 'next/link';
import { PersonProps } from '../../lib/data/types';

export default function ListResults({
  peopleResults,
}: {
  peopleResults: PersonProps[] | undefined;
}) {
  return (
    <>
      <div className={style.list}>
        <nav className={style.navigation}>
          {peopleResults?.length ? (
            <ul className={style.cards}>
              {peopleResults.map((hero, index) => (
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
      </div>
    </>
  );
}
