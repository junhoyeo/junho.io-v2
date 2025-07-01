import { css, Global } from '@emotion/react';
import { type AppProps } from 'next/app';
import { useEffect } from 'react';
import '@/styles/reset.css';
import '@/styles/fonts.css';
import '@/styles/global.css';
import '@/styles/linkflags.css';
import { NavigationBar } from '@/components/NavigationBar';
import { colors } from '@/styles/colors';

const systemFontStack = `
  'Pretendard Variable', Inter, ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
  Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji
`;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.querySelector('body')?.classList.remove('preload');
  }, []);

  return (
    <>
      <Global
        styles={css`
          :root {
            --SystemFontStack: ${systemFontStack};
          }

          body {
            background-color: ${colors.background};
            color: ${colors.foreground};
            margin: 0;
            padding: 0;
          }

          #__next {
            overflow-x: unset !important;
          }

          *:not(code, code *) {
            box-sizing: border-box !important;
            word-break: keep-all;
            font-family: var(--SystemFontStack) !important;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          ::selection {
            background-color: ${colors.selection};
            color: ${colors.foreground};
          }
        `}
      />
      <NavigationBar />

      <Component {...pageProps} />
    </>
  );
}
