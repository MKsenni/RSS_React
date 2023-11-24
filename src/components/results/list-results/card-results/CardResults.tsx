import Link from 'next/link';
import { PersonProps } from '../../../../services/types';
import style from '../listResults.module.css';
// import { NavLink } from 'react-router-dom';

export default function CardResults({ hero }: { hero: PersonProps }) {
  // const { search } = useLocation();

  return (
    <>
      <li className={style.link}>
        <Link href={`details/${hero.name}`}>{hero.name}</Link>
      </li>
    </>
  );
}
