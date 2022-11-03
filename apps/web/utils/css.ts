import { css, type SerializedStyles } from '@emotion/react';

export const fixedWidth = (width: number): SerializedStyles => css`
  width: ${width}px;
  max-width: ${width}px;
  min-width: ${width}px;
`;
