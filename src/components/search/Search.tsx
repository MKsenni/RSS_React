import style from './search.module.css';
import React, { useContext, useState } from 'react';
import { useNavigation, Form } from 'react-router-dom';
import { SearchWordContext } from '../../context';

export default function Search() {
  const navigation = useNavigation();

  const searching: boolean | undefined =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('search');

  const wordContext = useContext(SearchWordContext);
  const [word, setWord] = useState(wordContext);
  if (searching) {
    localStorage.setItem('searchWord', word);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    setWord(searchWord);
  };

  return (
    <>
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
        </Form>
      </section>
    </>
  );
}
