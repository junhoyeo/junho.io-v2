import styled from '@emotion/styled';
import { useTheme } from '@geist-ui/core';
import { type MDXProvider } from '@mdx-js/react';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { type PostDocument } from '@/posts/lib/types';

import { Code } from './Code';
import { MDXRemote } from './MDXRemote';

const Image: React.FC<NextImageProps> = ({ style, ...props }) => {
  const { palette } = useTheme();
  return (
    <NextImage
      {...props}
      width={1080}
      height={600}
      style={{
        ...style,
        borderColor: palette.accents_1,
        backgroundColor: palette.accents_2,
      }}
    />
  );
};

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
    <h2
      {...props}
      id={generatedId}
      style={{ ...style, marginTop: 42, fontSize: 28 }}
    />
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
  p: styled.p`
    color: rgba(255, 255, 255, 0.9);
  `,
  code: Code,
  Link,
  ImageList: styled.div`
    width: 100%;
    display: flex;
    gap: 4px;

    & > img {
      width: 50%;
      width: calc((100% - 4px) / 2);
    }

    @media screen and (max-width: 600px) {
      flex-direction: column;
      gap: 6px;

      & > img {
        width: 100%;
      }
    }
  `,
  Image: styled(Image)`
    height: fit-content;
    border: 1px solid;
    border-radius: 4px;
    filter: saturate(1.08);
  `,
  pre: (props: { children?: React.ReactNode }) => <div>{props.children}</div>,
};

export const MDXRenderer: React.FC<PostDocument> = (props) => {
  return <MDXRemote {...props} components={components} />;
};
