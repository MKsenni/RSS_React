export const baseUrl = 'https://swapi.dev/api/people';

export type Description = [
  {
    id: string;
    name: string;
    gender: string;
    birth_year: string;
    height: string;
    mass: string;
  },
];

export type PeopleResponse = {
  count: number;
  next: string;
  previous: string;
  results: Description;
};

export const searchPeople = async (searchWord: string, page: number = 1) => {
  try {
    const response = await fetch(
      `${baseUrl}/?search=${searchWord}&page=${page}`
    );
    const person: PeopleResponse = await response.json();
    return person;
  } catch (error) {
    return null;
  }
};

export const getPeople = async (page: number = 1) => {
  try {
    const response = await fetch(`${baseUrl}/?page=${page}`);
    const people: PeopleResponse = await response.json();
    return people;
  } catch (error) {
    return null;
  }
};
