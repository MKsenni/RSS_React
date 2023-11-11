import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PeopleResponse } from '../../services/actions';

export default function Pagination({
  people,
}: {
  people: PeopleResponse | null;
}) {
  const searchWord = localStorage.getItem('searchWord') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const prevCurrentPage = useRef(currentPage);
  const prevItemsPerPage = useRef(itemsPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      prevCurrentPage.current !== currentPage ||
      prevItemsPerPage.current !== itemsPerPage
    ) {
      if (searchWord) {
        // setSearchParams({
        //   page: currentPage.toString(),
        //   limit: itemsPerPage.toString(),
        //   search: searchWord,
        // });
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', itemsPerPage.toString());
        params.set('search', searchWord);
        navigate(`?${params.toString()}`);
      } else {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        params.set('limit', itemsPerPage.toString());
        navigate(`?${params.toString()}`);
        // setSearchParams({
        //   page: currentPage.toString(),
        //   limit: itemsPerPage.toString(),
        // });

        // const params = new URLSearchParams(searchParams.toString());
        // params.set('page', currentPage.toString());
        // params.set('limit', itemsPerPage.toString());
        // navigate(`?${params.toString()}`);
      }
      prevCurrentPage.current = currentPage;
      prevItemsPerPage.current = itemsPerPage;
    }
  }, [currentPage, itemsPerPage]);

  const prevBtn = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextBtn = () => {
    if (people && people.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="pagination-block">
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={prevBtn}
            disabled={people?.previous ? false : true}
          >
            prev
          </button>
          <span>{currentPage}</span>
          <button
            className="pagination-button"
            onClick={nextBtn}
            disabled={people?.next ? false : true}
          >
            next
          </button>
        </div>
        <select
          className="select-perpage"
          value={itemsPerPage}
          onChange={handleSelect}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </>
  );
}
