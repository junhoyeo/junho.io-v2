import { Global, css } from '@emotion/react';
import { CssBaseline, GeistProvider } from '@geist-ui/core';
import { type AppProps } from 'next/app';
import { useEffect } from 'react';

import '@/styles/fonts.css';
import '@/styles/linkflags.css';

import { NavigationBar } from '@/components/NavigationBar';

const themeType = 'dark';
const systemFontStack = `
  'Pretendard Variable', Inter, ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
  Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji
`;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.querySelector('body')?.classList.remove('preload');
  }, []);

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Global
        styles={css`
          :root {
            --SystemFontStack: ${systemFontStack};
          }

          #__next {
            overflow-x: unset !important;
          }

          *:not(code, code *) {
            box-sizing: border-box !important;
            word-break: keep-all;
            font-family: var(--SystemFontStack) !important;
          }
        `}
      />
      <NavigationBar />

      <Component {...pageProps} />
    </GeistProvider>
  );
}
