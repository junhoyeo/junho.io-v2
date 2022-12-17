import { extendTheme, type Theme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  textStyles: {
    h4: {
      letterSpacing: '0',
    },
  },
}) as Theme;
