export const baseUrl = 'https://swapi.dev/api/people';

export type PeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PersonProps[];
};

export type PersonProps = {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  mass: string;
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
    const response = await fetch(`${baseUrl}/?page=${page === 0 ? 1 : page}`);
    const people: PeopleResponse = await response.json();
    return people;
  } catch (error) {
    return null;
  }
};

export const getPerson = async (searchWord: string) => {
  try {
    const response = await fetch(`${baseUrl}/?search=${searchWord}`);
    const person: PeopleResponse = await response.json();
    return person;
  } catch (error) {
    return null;
  }
};
