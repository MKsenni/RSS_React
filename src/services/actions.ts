import { PeopleResponse } from './types';

export const baseUrl = 'https://swapi.dev/api/people';

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
