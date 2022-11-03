import { Global, css } from '@emotion/react';
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
      <Global
        styles={css`
          #__next {
            overflow-x: unset !important;
          }

          * {
            box-sizing: border-box !important;
          }
        `}
      />
      <Component {...pageProps} />
    </GeistProvider>
  );
}
