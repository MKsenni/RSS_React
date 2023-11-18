import style from './card.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { PersonProps } from '../../services/types';
import { useGetPersonQuery } from '../../services/peopleApi';

export default function Card() {
  const { name } = useParams();
  const navigate = useNavigate();

  const { data } = useGetPersonQuery(name ? name : '');

  const handleClose = (): void => {
    navigate(-1);
  };

  return (
    <>
      {data?.results &&
        (data.results.length > 0 ? (
          data.results.map((person: PersonProps, index: number) => (
            <div className={style.card} key={index} data-testid="card">
              <button
                className={style.button}
                type="button"
                onClick={handleClose}
              >
                X
              </button>
              <div className={style.container}>
                <span className={style.name}>Name: {person.name}</span>
                <span className={style.gender}>Gender: {person.gender}</span>
                <span className={style.birth}>Year: {person.birth_year}</span>
                <span className={style.mass}>Mass: {person.mass}</span>
                <span className={style.height}>Height: {person.height}</span>
              </div>
              <span className={style.overlay} onClick={handleClose}></span>
            </div>
          ))
        ) : (
          <span>No Results</span>
        ))}
    </>
  );
}
