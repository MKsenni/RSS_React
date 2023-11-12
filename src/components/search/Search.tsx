import style from './search.module.css';
import React, { useState } from 'react';
import { useNavigation, Form } from 'react-router-dom';
import { SearchWordContext } from '../../context';

export default function Search() {
  const navigation = useNavigation();

  const searching: boolean | undefined =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('search');

  const [word, setWord] = useState(localStorage.getItem('searchWord') || '');
  if (searching) {
    localStorage.setItem('searchWord', word);
  }
  const [hasError, setHasError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    setWord(searchWord);
  };

  const errorBoundary = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setHasError(true);
  };
  return (
    <>
      {hasError && { throw: Error() }}
      <SearchWordContext.Provider value={word}>
        <h1 className={style.title}>
          Star Wars <p className={style.subtitle}>: heroes</p>
        </h1>
        <section className={style.searchField}>
          <Form role="search">
            <input
              type="search"
              name="search"
              value={word.toUpperCase()}
              placeholder="name of hero"
              onChange={handleChange}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
          </Form>
          <button onClick={errorBoundary}>Error Boundary</button>
        </section>
      </SearchWordContext.Provider>
    </>
  );
}
