import { Provider } from 'react-redux';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { wrapper } from './api/store';
import Layout from '../components/layout';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  );
}
