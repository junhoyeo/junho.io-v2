import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { type AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
