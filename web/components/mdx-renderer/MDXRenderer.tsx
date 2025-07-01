import styled from '@emotion/styled';
import Head from 'next/head';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { type PostDocument } from '@/posts/lib/types';
import { Analytics } from '@/utils/analytics';
import { colors } from '@/styles/colors';
import { Tweet } from '../twitter';
import { TweetsContext } from '../twitter/context';
import { Code } from './Code';
import { MDXRemote } from 'next-mdx-remote';
import { Trophy } from './Trophy';

const Image: React.FC<NextImageProps> = ({ style, ...props }) => {
  return (
    <NextImage
      {...props}
      width={1080}
      height={600}
      quality={85}
      style={{
        ...style,
        borderColor: colors.accents_1,
        backgroundColor: colors.accents_2,
      }}
    />
  );
};

const Position: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ style, ...props }) => (
  <p>
    <strong style={{ ...style, color: '#595c7c' }} {...props} />
  </p>
);

const useIsBlog = () => {
  const router = useRouter();
  const isBlog = useMemo(() => {
    return ['/blog', '/w/'].some((r) => router.asPath.includes(r));
  }, [router.asPath]);
  return { isBlog };
};

type HomeHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
const HomeHeading: React.FC<HomeHeadingProps> = ({ id, style, ...props }) => {
  const [inViewRef, inView] = useInView({ threshold: 0.5 });

  const generatedId = useMemo(() => {
    if (id) {
      return id;
    }
    return props.children?.toString().toLowerCase().replace(/ /g, '-');
  }, [id, props.children]);

  const { isBlog } = useIsBlog();

  useEffect(() => {
    if (isBlog) {
      return;
    }
    if (inView && !!generatedId) {
      Analytics.logEvent('view_landing_section', {
        section: generatedId,
      });
    }
  }, [inView, generatedId, isBlog]);

  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2
      ref={inViewRef}
      {...props}
      id={generatedId}
      style={{
        ...style,
        ...(isBlog ? { paddingTop: 48 } : { paddingTop: 100 }),
        fontSize: 28,
      }}
    />
  );
};

const TrackedAnchor: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ href, onClick, ...props }) => {
  const { isBlog } = useIsBlog();

  const onClickAnchor = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (isBlog) {
        return;
      }
      Analytics.logEvent('click_inline_link', {
        title: props.children?.toString() || 'unknown',
      });
    },
    [isBlog, onClick, props.children],
  );

  return (
    <a
      href={href}
      onClick={onClickAnchor}
      {...props}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
};

const components = {
  h2: HomeHeading,
  h3: styled.h3`
    padding-top: 48px;
  `,
  h4: styled.h3`
    padding-top: 48px;
  `,
  h5: styled.h3`
    padding-top: 48px;
  `,
  h6: styled.h3`
    padding-top: 48px;
  `,
  p: styled.p`
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
  `,
  a: TrackedAnchor,
  // @ts-ignore
  code: Code,
  ul: styled.ul`
    display: flex;
    flex-direction: column;
  `,
  li: styled.li`
    font-size: 1.1rem;

    p {
      margin: 0;
    }
  `,
  Link,
  Trophy,
  Position,
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
  pre: (props: React.PropsWithChildren) => <div>{props.children}</div>,
  Tweet,
  head: (props: React.PropsWithChildren) => <Head>{props.children}</Head>,
};

export const MDXRenderer: React.FC<PostDocument> = ({ tweets, ...props }) => {
  return (
    <article>
      <TweetsContext.Provider value={tweets}>
        {/* @ts-ignore */}
        <MDXRemote {...props} components={components} />
      </TweetsContext.Provider>
    </article>
  );
};
