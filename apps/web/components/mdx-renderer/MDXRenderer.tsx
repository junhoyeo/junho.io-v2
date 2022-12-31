import styled from '@emotion/styled';
import { type MDXProvider } from '@mdx-js/react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { type PostDocument } from '@/posts/lib/types';

import { Code } from './Code';
import { MDXRemote } from './MDXRemote';

const Image: React.FC<NextImageProps> = (props) => (
  <NextImage {...props} width={1080} height={1080} />
);

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export const HeadingTwo: React.FC<HeadingProps> = ({ id, style, ...props }) => {
  const generatedId = useMemo(() => {
    if (id) {
      return id;
    }
    return props.children?.toString().toLowerCase().replace(/ /g, '-');
  }, [id, props.children]);

  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2 {...props} id={generatedId} style={{ ...style, marginTop: 42 }} />
  );
};

const components: React.ComponentProps<typeof MDXProvider>['components'] = {
  h2: HeadingTwo,
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
  Link,
  ImageList: styled.div``,
  Image: styled(Image)``,
  pre: (props: { children?: React.ReactNode }) => <div>{props.children}</div>,
};

export const MDXRenderer: React.FC<PostDocument> = (props) => {
  return <MDXRemote {...props} components={components} />;
};
