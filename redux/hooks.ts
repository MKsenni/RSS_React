import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../pages/api/store';
import { peopleApi } from '../pages/api/peopleApi';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useGetPeopleQuery = peopleApi.endpoints.getPeople.useQuery;
export const useGetPersonQuery = peopleApi.endpoints.getPerson.useQuery;
