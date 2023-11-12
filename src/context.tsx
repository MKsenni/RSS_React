import { createContext } from 'react';
import { PeopleResponse } from './services/actions';

export const SearchWordContext = createContext('');
export const ResultsPeopleContext = createContext<PeopleResponse | null>(null);
