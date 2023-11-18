import style from './results.module.css';
import ListResults from './list-results/ListResults';
import Pagination from '../pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateItems } from '../../redux/slices/itemsPerPageSlice';
import { useGetPeopleQuery } from '../../services/peopleApi';
import Spinner from '../spiner/Spinner';

export default function Results() {
  const page: number = useAppSelector((state) => state.currentPage.pageNum);
  const { data, isLoading, isFetching } = useGetPeopleQuery(
    page ? Number(page) : 1
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateItems(data?.results));
    console.log(data);
  }, [data]);

  const totalItems = data?.count;
  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );
  if (!totalItems) return <Spinner />;
  const totalPage = Math.ceil(totalItems / countPerPage);

  return (
    <section className={style.results}>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <>
          <ListResults />
          <Pagination totalPage={totalPage} />
        </>
      )}
    </section>
  );
}
