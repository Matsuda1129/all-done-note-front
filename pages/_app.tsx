import { AppProps } from 'next/app';
import '../styles/global.css';
import { useStore } from '../redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import React from 'react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore();
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}
