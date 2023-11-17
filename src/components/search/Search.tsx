import style from './search.module.css';
import React from 'react';
import { Form } from 'react-router-dom';
import { setWord } from '../../redux/slices/searchWordSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function Search() {
  const word: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const dispatch = useAppDispatch();

  // const navigation = useNavigation();

  // const searching: boolean | undefined =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has('search');

  // const { word, setWord } = useContext<ISearchWordContext>(SearchWordContext);
  // const [word, setWord] = useState(wordContext);
  // if (searching && word) {
  //   localStorage.setItem('searchWord', word);
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    dispatch(setWord(searchWord));
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
            value={word ? word.toUpperCase() : ''}
            placeholder="name of hero"
            onChange={handleChange}
          />
        </Form>
      </section>
    </>
  );
}
