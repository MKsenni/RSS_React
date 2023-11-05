import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';
import { Description, getPeople } from '../api/actions';
import { Spinner } from '../components/spinner';
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { loaderApp } from './loaders';

export default function App() {
  const people = useLoaderData() as Awaited<ReturnType<typeof loaderApp>>;
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('search');

  const [word, setWord] = useState(localStorage.getItem('searchWord') || '');
  if (searching) localStorage.setItem('searchWord', word);
  const [searchResult, setSearchResult] = useState<Description | null>(people);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setSearchResult(people);
  }, [people]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = event.target.value;
    setWord(searchWord);
  };

  const errorBoundary = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setHasError(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchPeople = async () => {
      const people = await getPeople(currentPage);
      setSearchResult(people);
    };

    fetchPeople();
  }, [currentPage, itemsPerPage]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(87 / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const handleClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    setCurrentPage(Number(event.currentTarget.id));
    localStorage.setItem('searchWord', '');
    setWord('');
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      {hasError && { throw: Error() }}
      <h1 className="title">
        Star Wars <p className="subtitle">: heroes</p>
      </h1>
      <section className="search-field">
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
      <section className="results">
        {searching ? (
          <Spinner />
        ) : (
          <nav className="navigation">
            {searchResult?.length ? (
              <ul className="cards-list">
                {searchResult.map((hero, index) => (
                  <li key={index} className="card-link">
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? 'active' : isPending ? 'pending' : ''
                      }
                      to={`details/${hero.name}`}
                    >
                      {hero.name ? <>{hero.name}</> : <span>No Name</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <span>No Results</span>
            )}
          </nav>
        )}
        <div
          id="detail"
          className={navigation.state === 'loading' ? 'loading' : ''}
        >
          <Outlet />
        </div>
      </section>
      <div className="pagination-block">
        <ul className="pagination">
          {pageNumbers.map((number) => {
            return (
              <li key={number} id={`${number}`} onClick={handleClick}>
                {number}
              </li>
            );
          })}
        </ul>
        <select value={itemsPerPage} onChange={handleSelect}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </>
  );
}
