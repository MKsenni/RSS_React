import { useLoaderData, useNavigate } from 'react-router-dom';
import { loaderCard } from './loaders';

export type PersonProps = {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  mass: string;
};

export default function Card() {
  const navigate = useNavigate();
  const people = useLoaderData() as Awaited<ReturnType<typeof loaderCard>>;

  return (
    <>
      {people &&
        (people.length > 0 ? (
          people.map((person: PersonProps, index: number) => (
            <div className="card" key={index}>
              <button
                className="button-card"
                type="button"
                onClick={() => navigate(-1)}
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
            </div>
          ))
        ) : (
          <span>No Results</span>
        ))}
    </>
  );
}
