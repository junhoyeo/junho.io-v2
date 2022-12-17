import type { ColorMode } from '@chakra-ui/react';
import { CssBaseline } from '@geist-ui/core';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document';
import { Fragment } from 'react';

import { theme } from '../styles/theme';

type MaybeColorMode = ColorMode | 'system' | undefined;

const parseCookie = (cookie: string, key: string): MaybeColorMode => {
  const match = new RegExp(`(^| )${key}=([^;]+)`).exec(cookie);
  return match?.[2] as MaybeColorMode;
};

type DocumentProps = DocumentInitialProps & {
  colorMode: MaybeColorMode;
};

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    let colorMode: MaybeColorMode = theme.config.initialColorMode;

    if (ctx.req?.headers.cookie) {
      colorMode =
        parseCookie(ctx.req.headers.cookie, 'chakra-ui-color-mode') ||
        theme.config.initialColorMode;
    }

    return {
      ...initialProps,
      styles: [
        <Fragment key="1">
          {initialProps.styles}
          {styles}
        </Fragment>,
      ],
      colorMode,
    };
  }

  render(): JSX.Element {
    const { colorMode } = this.props;

    return (
      <Html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
        <Head />

        <body className={!colorMode ? undefined : `chakra-ui-${colorMode}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
