import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { type AppProps } from 'next/app';
import { useEffect } from 'react';

const themeType = 'dark';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.querySelector('body')?.classList.remove('preload');
  }, []);

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
