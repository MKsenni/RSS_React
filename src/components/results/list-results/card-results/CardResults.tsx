import { PersonProps } from '../../../../services/types';
import style from '../listResults.module.css';
import { NavLink, useLocation } from 'react-router-dom';

export default function CardResults({ hero }: { hero: PersonProps }) {
  const { search } = useLocation();

  return (
    <>
      <li className={style.link}>
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? 'active' : isPending ? 'pending' : ''
          }
          to={`details/${hero.name}` + search}
        >
          {hero.name}
        </NavLink>
      </li>
    </>
  );
}
