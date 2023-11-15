import { Dispatch, ReactNode, createContext, useState } from 'react';
import { PeopleResponse } from './services/actions';

export const SearchWordContext = createContext('');

export const SearchWordContextDispatch = createContext<Dispatch<
  React.SetStateAction<string>
> | null>(null);

export function SearhWord({ children }: { children: ReactNode }) {
  const [word, setWord] = useState(localStorage.getItem('searchWord') || '');

  return (
    <SearchWordContext.Provider value={word}>
      <SearchWordContextDispatch.Provider value={setWord}>
        {children}
      </SearchWordContextDispatch.Provider>
    </SearchWordContext.Provider>
  );
}

export const ResultsPeopleContext = createContext<PeopleResponse | null>(null);
