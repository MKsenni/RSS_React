import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { peopleApi } from '../services/peopleApi';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useGetPeopleQuery = peopleApi.endpoints.getPeople.useQuery;
export const useGetPersonQuery = peopleApi.endpoints.getPerson.useQuery;
