// import { ColorModeScript } from '@chakra-ui/react';
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

// import { theme } from '../styles/theme';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: [
        <Fragment key="1">
          {initialProps.styles}
          {styles}
        </Fragment>,
      ],
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
