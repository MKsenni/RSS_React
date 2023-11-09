import { LoaderFunctionArgs } from 'react-router-dom';
import { searchPeople, getPeople, PeopleResponse } from '../services/actions';
import { PersonProps } from '../components/card/Card';

export async function loaderApp({ request }: LoaderFunctionArgs<string>) {
  const searchWord = localStorage.getItem('searchWord');
  if (searchWord) {
    const url = new URL(request.url);
    const search: string | null = url.searchParams.get('search');
    if (search) {
      localStorage.setItem('searchWord', search);
      const people: PeopleResponse | null = await searchPeople(search);
      console.log('если есть searc в url');
      return people;
    }
    const people: PeopleResponse | null = await searchPeople(searchWord);
    console.log('если есть searchword в localstorage');
    return people;
  } else {
    const people: PeopleResponse | null = await getPeople();
    console.log('если нет searchword в localstorage');
    return people;
  }
}

export const loaderCard = async ({
  params,
}: LoaderFunctionArgs<PersonProps>) => {
  if (params.name) {
    const people: PeopleResponse | null = await searchPeople(params.name);
    return people;
  }
};

export const loaderPagination = async ({
  request,
}: LoaderFunctionArgs<string>) => {
  const url = new URL(request.url);
  const page: string | null = url.searchParams.get('page');
  if (page) {
    const people: PeopleResponse | null = await getPeople(Number(page));
    return people;
  }
};
