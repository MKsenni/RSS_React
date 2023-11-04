import { LoaderFunctionArgs } from 'react-router-dom';
import { Description, searchPeople, getPeople } from '../api/actions';
import { PersonProps } from './Card';

export async function loaderApp({ request }: LoaderFunctionArgs<string>) {
  const searchWord = localStorage.getItem('searchWord');
  if (searchWord) {
    const url = new URL(request.url);
    const search: string | null = url.searchParams.get('search');
    if (search) {
      localStorage.setItem('searchWord', search);
      const people: Description | null = await searchPeople(search);
      return people;
    }
    const people: Description | null = await searchPeople(searchWord);
    return people;
  } else {
    const people: Description | null = await getPeople();
    return people;
  }
}

export const loaderCard = async ({
  params,
}: LoaderFunctionArgs<PersonProps>) => {
  if (params.name) {
    const people: Description | null = await searchPeople(params.name);
    return people;
  }
};
