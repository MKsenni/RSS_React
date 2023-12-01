import { Provider } from 'react-redux';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { wrapper } from './api/store';
import Layout from '../components/layout';
import Spinner from '../components/spiner/Spinner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <Layout>
        {isLoading ? <Spinner /> : <Component {...props.pageProps} />}
      </Layout>
    </Provider>
  );
}
