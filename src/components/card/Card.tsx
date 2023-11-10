import { useLoaderData, useNavigate } from 'react-router-dom';
import { loaderCard } from '../../routes/loaders';
import { PersonProps } from '../../services/actions';

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
            <div className="card" key={index}>
              <button
                className="button-card"
                type="button"
                onClick={handleClose}
              >
                X
              </button>
              <div className="text-container">
                <span className="card-name">Name: {person.name}</span>
                <span className="card-gender">Gender: {person.gender}</span>
                <span className="card-birth">Year: {person.birth_year}</span>
                <span className="card-mass">Mass: {person.mass}</span>
                <span className="card-height">Height: {person.height}</span>
              </div>
              <span className="overlay" onClick={handleClose}></span>
            </div>
          ))
        ) : (
          <span>No Results</span>
        ))}
    </>
  );
}
