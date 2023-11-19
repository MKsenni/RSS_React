import style from './results.module.css';
import ListResults from './list-results/ListResults';
import Pagination from '../pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { updateItems } from '../../redux/slices/itemsPerPageSlice';
import { useGetPeopleQuery } from '../../services/peopleApi';
import Spinner from '../spiner/Spinner';
import { setLoadingMainPage } from '../../redux/slices/loadingFlagsSlice';

export default function Results() {
  const page: number = useAppSelector((state) => state.currentPage.pageNum);
  const searchWord: string | null = useAppSelector(
    (state) => state.searchWord.searchWord
  );
  const countPerPage = useAppSelector(
    (state) => state.currentPage.countPerPage
  );
  const loadingMainPage = useAppSelector(
    (state) => state.loadingFlags.mainPageLoading
  );
  const { data, isFetching } = useGetPeopleQuery({
    page: page ?? 1,
    searchWord: searchWord ?? '',
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateItems(data?.results));
  }, [data]);

  useEffect(() => {
    dispatch(setLoadingMainPage(isFetching));
  }, [isFetching]);

  const totalItems = data?.count;
  if (!totalItems) return <Spinner />;
  const totalPage = Math.ceil(totalItems / countPerPage);

  return (
    <section className={style.results}>
      {loadingMainPage ? (
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
