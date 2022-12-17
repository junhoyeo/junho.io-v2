import { extendTheme, type Theme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  global: () => ({
    html: {
      bg: 'black',
    },
    body: {
      bg: 'transparent',
    },
  }),
  textStyles: {
    h4: {
      letterSpacing: '0',
    },
  },
}) as Theme;
