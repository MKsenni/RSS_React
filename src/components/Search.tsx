import React, { useState } from 'react';
import { Description, searchPeople } from '../api/actions';

type SearchProps = {
  searchWord: string;
  searchResult?: Description;
  onUpdateWord: (searchWord: string) => void;
  onUpdateSearchResult: (data: Description | undefined) => void;
};

export default function Search({
  searchWord,
  onUpdateWord,
  onUpdateSearchResult,
}: SearchProps) {
  const [word, setWord] = useState(searchWord);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    setWord(searchWord);
    onUpdateWord(searchWord);
  };

  const handleSearch = async () => {
    localStorage.setItem('searchWord', word);
    const searchWord: string = word.toUpperCase().trim();
    // setIsLoading(true);
    const people: Description | undefined = await searchPeople(searchWord);
    onUpdateSearchResult(people);
    // localStorage.setItem('searchWord', searchWord);
    // setIsLoading(false);
  };

  return (
    <>
      <input
        type="search"
        name="search"
        value={word.toUpperCase()}
        onChange={handleChange}
      />
      <button type="button" value="search" onClick={handleSearch}>
        search
      </button>
    </>
  );
}
