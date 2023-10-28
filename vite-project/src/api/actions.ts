export const baseUrl = 'https://swapi.dev/api';

const path = {
  people: 'people',
  films: 'films',
};

export type Description = [{
  name: string,
  gender: string,
  birth_year: string,
  height: string,
  mass: string,
}]

export type People = {
  results: Description;
}

export const searchPeople = async (searchWord: string) => {
  try {
    const response = await fetch(`${baseUrl}/${path.people}/?${searchWord}`);
    const person: People = await response.json();
    console.log(person.results);
    
    return person.results;
    
  } catch(error) {
    throw new Error('Fetch is Faild');
  }
}

export const getPeople = async () => {
  try {
    const response = await fetch(`${baseUrl}/${path.people}`);
    const people = await response.json();
    return people;
  } catch(error) {
    throw new Error('Fetch is Faild');
    
  }
}