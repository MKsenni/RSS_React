import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ReactNode } from 'react';

export function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
