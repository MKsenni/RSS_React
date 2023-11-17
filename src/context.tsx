import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import { PeopleResponse } from './services/actions';

type TypeSetState<S> = Dispatch<SetStateAction<S>>;

export interface ISearchWordContext {
  word: string;
  setWord: TypeSetState<string>;
}

export const SearchWordContext = createContext<ISearchWordContext>({
  word: '',
  setWord: () => {},
});

// export const SearchWordContextDispatch = createContext<Dispatch<
//   React.SetStateAction<string>
// > | null>(null);

export function SearhWord({ children }: { children: ReactNode }) {
  const [word, setWord] = useState(localStorage.getItem('searchWord') || '');

  const value = useMemo(() => ({ word, setWord }), [word]);

  return (
    <SearchWordContext.Provider value={value}>
      {children}
    </SearchWordContext.Provider>
  );
}

export const ResultsPeopleContext = createContext<PeopleResponse | null>(null);
