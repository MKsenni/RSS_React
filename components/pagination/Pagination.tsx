import style from './pagination.module.css';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCountPerPage } from '../../redux/slices/currentPageSlice';
import { useRouter } from 'next/router';
import { INITIAL_PAGE } from '../../lib/data/constants';

export default function Pagination({ totalPage }: { totalPage: number }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const page = router.query.page;
  const numNextPage = page ? Number(page) + 1 : 2;
  const numPrevPage = page ? (page !== '1' ? Number(page) - 1 : null) : null;

  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );

  const prevBtn = () => {
    router.push(`/page/${numPrevPage}/?limit=${countPerPage}`);
  };

  const nextBtn = () => {
    router.push(`/page/${numNextPage}/?limit=${countPerPage}`);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const currentCountPerPage = Number(event.target.value);
    dispatch(setCountPerPage(currentCountPerPage));
    router.push(`/page/${INITIAL_PAGE}/?limit=${currentCountPerPage}`);
  };

  return (
    <>
      <div className={style.pagination}>
        <div className={style.container}>
          <button
            className={style.button}
            onClick={prevBtn}
            disabled={!numPrevPage}
          >
            prev
          </button>
          <span>{page ? page : 1}</span>
          <button
            className={style.button}
            onClick={nextBtn}
            disabled={totalPage < numNextPage}
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
