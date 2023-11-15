export const baseUrl = 'https://swapi.dev/api';

const path = {
  people: 'people',
  films: 'films',
};

export type Description = [
  {
    name: string;
    gender: string;
    birth_year: string;
    height: string;
    mass: string;
  },
];

export type People = {
  results: Description;
};

export const searchPeople = async (searchWord: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/${path.people}/?search=${searchWord}`
    );
    const person: People = await response.json();
    return person.results;
  } catch (error) {}
};

export const getPeople = async () => {
  try {
    const response = await fetch(`${baseUrl}/${path.people}`);
    const people: People = await response.json();
    return people.results;
  } catch (error) {}
};
