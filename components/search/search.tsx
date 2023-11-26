import style from './search.module.css';
import React, { useState } from 'react';
import router from 'next/router';
import { INITIAL_PAGE } from '../../lib/data/constants';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setPage } from '../../redux/slices/currentPageSlice';
import { setWord } from '../../redux/slices/searchWordSlice';

export default function Search() {
  const word: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const [searchWord, setSearchWord] = useState(word);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    setSearchWord(searchWord);
  };

  const applySearchWord = (searchWord: string | null) => {
    dispatch(setWord(searchWord ?? ''));
    dispatch(setPage(INITIAL_PAGE));
    searchWord
      ? router.push(`/page/1/detailes/${searchWord}/?limit=10`)
      : router.push(`/page/1/?limit=10`);
  };

  const handleClickEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applySearchWord(searchWord);
    }
  };

  const handleSearch = () => {
    applySearchWord(searchWord);
  };

  return (
    <>
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
    </>
  );
}
