import style from './pagination.module.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  prevPage,
  nextPage,
  setPage,
  setCountPerPage,
} from '../../redux/slices/currentPageSlice';

export default function Pagination({ totalPage }: { totalPage: number }) {
  const dispatch = useAppDispatch();
  const word: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );

  const currentPage = useAppSelector((state) => state.currentPage.pageNum);

  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (word) {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', countPerPage.toString());
      params.set('search', word);
      navigate(`?${params.toString()}`);
    } else {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', countPerPage.toString());
      navigate(`?${params.toString()}`);
    }
  }, [currentPage, countPerPage]);

  const prevBtn = () => {
    dispatch(prevPage());
  };

  const nextBtn = () => {
    dispatch(nextPage());
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setCountPerPage(Number(event.target.value)));
    dispatch(setPage(1));
  };

  return (
    <>
      <div className={style.pagination}>
        <div className={style.container}>
          <button
            className={style.button}
            onClick={prevBtn}
            disabled={currentPage > 1 ? false : true}
          >
            prev
          </button>
          <span>{currentPage}</span>
          <button
            className={style.button}
            onClick={nextBtn}
            disabled={totalPage === currentPage ? true : false}
          >
            next
          </button>
        </div>
        <select
          className={style.select}
          value={countPerPage}
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
