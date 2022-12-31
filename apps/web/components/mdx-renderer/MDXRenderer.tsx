import styled from '@emotion/styled';
import { type MDXProvider } from '@mdx-js/react';

import { type PostDocument } from '@/posts/lib/types';

import { Code } from './Code';
import { MDXRemote } from './MDXRemote';

const components: React.ComponentProps<typeof MDXProvider>['components'] = {
  h2: styled.h2`
    margin-top: 42px;
  `,
  h3: styled.h3`
    margin-top: 42px;
  `,
  h4: styled.h3`
    margin-top: 42px;
  `,
  h5: styled.h3`
    margin-top: 42px;
  `,
  h6: styled.h3`
    margin-top: 42px;
  `,
  code: Code,
  pre: (props: { children?: React.ReactNode }) => <div>{props.children}</div>,
};

export const MDXRenderer: React.FC<PostDocument> = (props) => {
  return <MDXRemote {...props} components={components} />;
};
