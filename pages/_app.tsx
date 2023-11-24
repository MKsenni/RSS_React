import { Provider } from 'react-redux';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../src/redux/store';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />;
    </Provider>
  );
}
