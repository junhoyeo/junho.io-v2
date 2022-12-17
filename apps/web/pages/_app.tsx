import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { type AppProps } from 'next/app';
import { useEffect } from 'react';

import { theme } from '../styles/theme';

const themeType = 'dark';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.querySelector('body')?.classList.remove('preload');
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <GeistProvider themeType={themeType}>
        <CssBaseline />
        <Global
          styles={css`
            #__next {
              overflow-x: unset !important;
            }

            * {
              box-sizing: border-box !important;
              word-break: keep-all;
            }
          `}
        />
        <Component {...pageProps} />
      </GeistProvider>
    </ChakraProvider>
  );
}
