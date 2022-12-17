import { extendTheme, type Theme } from '@chakra-ui/react';

export const theme = extendTheme({
  textStyles: {
    h4: {
      letterSpacing: '0',
    },
  },
}) as Theme;
