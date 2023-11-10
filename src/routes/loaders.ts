import { LoaderFunctionArgs } from 'react-router-dom';
import {
  searchPeople,
  getPeople,
  PeopleResponse,
  getPerson,
  PersonProps,
} from '../services/actions';

export async function loaderApp({ request }: LoaderFunctionArgs<string>) {
  const searchWord = localStorage.getItem('searchWord');
  if (searchWord) {
    const url = new URL(request.url);
    const search: string | null = url.searchParams.get('search');
    if (search) {
      localStorage.setItem('searchWord', search);
      const people: PeopleResponse | null = await searchPeople(search);
      return people;
    }
    const people: PeopleResponse | null = await searchPeople(searchWord);
    return people;
  } else {
    const url = new URL(request.url);
    const people: PeopleResponse | null = await getPeople(
      Number(url.searchParams.get('page'))
    );
    return people;
  }
}

export const loaderCard = async ({
  params,
}: LoaderFunctionArgs<PersonProps>) => {
  if (params.name) {
    const people: PeopleResponse | null = await getPerson(params.name);
    return people;
  }
};
