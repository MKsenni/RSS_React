import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import {
  Description,
  PeopleResponse,
  searchPeople,
} from '../../services/actions';

// const NUMBER_PEOPLE = 87;

export default function Pagination({
  people,
  onUpdate,
}: {
  people: PeopleResponse | null;
  onUpdate: (people: Description) => void;
}) {
  console.log(people);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const word = localStorage.getItem('searchWord') || '';

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPeople = async () => {
      const people = await searchPeople(word, Number(searchParams));
      if (people) {
        onUpdate(people.results);
      }
    };
    fetchPeople();
  }, [currentPage, itemsPerPage]);

  const pageNumbers = [];
  if (people) {
    for (let i = 1; i <= Math.ceil(people.count / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLLIElement>): void => {
    setCurrentPage(Number(event.currentTarget.id));
    setSearchParams({ page: event.currentTarget.id + 1 });
    // localStorage.setItem('searchWord', '');
    // setWord('');
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="pagination-block">
        <ul className="pagination">
          {pageNumbers.map((number) => {
            return (
              <li key={number} id={`${number}`} onClick={handleClick}>
                <NavLink to={`page/${number}`}>{number}</NavLink>
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
