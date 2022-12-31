// @flow
// Dracula
// Converted automatically using ./tools/themeFromVsCode

import { type PrismTheme } from 'prism-react-renderer';

export const theme: PrismTheme = {
  plain: {
    color: '#f8f8f2',
    backgroundColor: '#282a36',
  },
  styles: [
    {
      types: ['prolog', 'constant', 'builtin'],
      style: {
        color: 'rgb(189, 147, 249)',
      },
    },
    {
      types: ['inserted', 'function'],
      style: {
        color: 'rgb(80, 250, 123)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['changed'],
      style: {
        color: 'rgb(255, 184, 108)',
      },
    },
    {
      types: ['punctuation', 'class-name'],
      style: {
        color: 'rgb(139, 233, 253)',
      },
    },
    {
      types: ['string', 'char', 'tag', 'selector'],
      style: {
        color: 'rgb(255, 121, 198)',
      },
    },
    {
      types: ['keyword', 'variable'],
      style: {
        color: 'rgb(189, 147, 249)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(98, 114, 164)',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: 'rgb(241, 250, 140)',
      },
    },
    {
      types: ['operator'],
      style: {},
    },
    {
      types: ['symbol'],
      style: {
        color: 'rgb(248, 248, 242)',
      },
    },
  ],
};
