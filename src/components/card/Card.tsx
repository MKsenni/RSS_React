import style from './card.module.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { loaderCard } from '../../routes/loaders';
import { PersonProps } from '../../services/types';

export default function Card() {
  const navigate = useNavigate();
  const people = useLoaderData() as Awaited<ReturnType<typeof loaderCard>>;

  const handleClose = (): void => {
    navigate(-1);
  };

  return (
    <>
      {people?.results &&
        (people.results.length > 0 ? (
          people.results.map((person: PersonProps, index: number) => (
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
