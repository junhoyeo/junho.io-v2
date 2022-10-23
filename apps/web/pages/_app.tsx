import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { type AppProps } from 'next/app';

const themeType = 'dark';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
