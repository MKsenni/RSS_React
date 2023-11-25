import style from './layout.module.css';
import React, { useState } from 'react';
import { setWord } from '../redux/slices/searchWordSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setPage } from '../redux/slices/currentPageSlice';
import { INITIAL_PAGE } from '../lib/data/constants';

export default function Layout({ children }: { children: React.ReactNode }) {
  const word: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const [searchWord, setSearchWord] = useState(word);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    setSearchWord(searchWord);
  };

  const handleClickEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter'
      ? dispatch(setWord(searchWord ?? '')) && dispatch(setPage(INITIAL_PAGE))
      : null;
  };

  const handleSearch = () => {
    dispatch(setWord(searchWord ?? ''));
    dispatch(setPage(INITIAL_PAGE));
  };

  return (
    <>
      <h1 className={style.title}>
        Star Wars <p className={style.subtitle}>: heroes</p>
      </h1>
      <div className={style.searchField}>
        <input
          className={style.inputSearch}
          type="search"
          name="search"
          value={searchWord ? searchWord.toUpperCase() : ''}
          placeholder="name of hero"
          onChange={handleChange}
          onKeyUp={handleClickEnter}
        />
        <button type="button" onClick={handleSearch}>
          search
        </button>
      </div>
      {children}
    </>
  );
}
