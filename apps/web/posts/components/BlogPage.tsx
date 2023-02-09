import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Head, defaultMeta } from '@/about/components/head';
import { Layout } from '@/components/Layout';
import { MDXRenderer } from '@/components/mdx-renderer';
import { extractTweetsFromBody } from '@/components/twitter/utils';
import { Analytics } from '@/utils/analytics';

import {
  rehypeExtractHeadings,
  type Heading,
} from '../lib/rehype-extract-headings';
import { rehypeTransformSlug } from '../lib/rehype-transform-slug';
import type { Post, PostCategoryType, PostDocument } from '../lib/types';
import { ToC } from './ToC';

export type BlogPageProps = PostDocument & {
  headings: Heading[];
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const BlogPage: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  const { palette } = useTheme();
  const {
    query: { slug },
  } = useRouter();

  useEffect(() => {
    Analytics.logEvent('view_blog_post', {
      slug: (slug as string[]).join('/'),
      title: props.meta.title,
    });
  }, [props, slug]);

  return (
    <>
      <Head
        meta={{
          ...defaultMeta,
          title: `${props.meta.emoji ? `${props.meta.emoji} ` : ''}${
            props.meta.title
          }`,
          description: props.meta.slug,
        }}
      />
      <Wrapper>
        <Container>
          <Breadcrumbs>
            <Link href="/" style={{ color: palette.accents_5 }}>
              <Breadcrumbs.Item>Paracøsm</Breadcrumbs.Item>
            </Link>
            <Link href={`/${props.type}`} style={{ color: palette.accents_5 }}>
              <Breadcrumbs.Item>{capitalize(props.type)}</Breadcrumbs.Item>
            </Link>
            <Breadcrumbs.Item
              href="#"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {props.meta.title}
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <Title h1>{props.meta.title}</Title>
          <Main>
            <MDXRenderer {...props} />
          </Main>
        </Container>
        <ToC headings={props.headings} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  gap: 32px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin-left: 240px;
`;

const Title = styled(Text)`
  margin-top: 42px;

  font-weight: 900;
  line-height: 1.25;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 600px) {
    margin-top: 24px;
    font-size: 36px;
  }

  @media screen and (max-width: 400px) {
    font-size: 32px;
  }
`;

const Main = styled.main`
  img {
    margin: 0 auto;
    display: flex;
    border-radius: 8px;
    width: 100%;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const withCache = <ReturnType extends any, Params extends any[]>(
  fetcher: (...params: Params) => ReturnType,
): ((...params: Params) => ReturnType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache: Record<string, any> = {};
  return (...params: Params) => {
    const key = JSON.stringify(params);

    if (cache[key]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cache[key];
    }

    if (!cache[key]) {
      cache[key] = null;
    }

    cache[key] = null;
    cache[key] = fetcher(...params);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return cache[key];
  };
};
const getPosts = withCache((type: PostCategoryType) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const md = require('@/posts/lib/get-posts') as {
    getPosts: (type: PostCategoryType) => Post[];
  };

  return md.getPosts(type);
});

export const buildGetStaticProps: (type: PostCategoryType) => GetStaticProps =
  (type) =>
  async ({ params }) => {
    const slug = ((params?.slug || []) as string[]).join('/');

    const posts = getPosts(type);
    const postIndex = posts.findIndex((p) => p.slug === slug);
    const post = posts[postIndex];

    if (!post) {
      return {
        notFound: true,
      };
    }

    const { body, ...meta } = post;

    const headings: Heading[] = [];
    const [serializedResult, tweetById] = await Promise.all([
      serialize(body, {
        mdxOptions: {
          development: false,
          rehypePlugins: [
            rehypeTransformSlug,
            [rehypeExtractHeadings, { rank: 2, headings }],
          ],
        },
      }),
      extractTweetsFromBody(body),
    ]);

    return {
      props: {
        meta,
        type,
        headings,
        tweets: tweetById,
        ...serializedResult,
      },
    };
  };

export const buildGetStaticPaths: (type: PostCategoryType) => GetStaticPaths =
  (type) => () => ({
    paths: getPosts(type).map((p) => ({
      params: { slug: !p.slug ? [''] : p.slug.split('/') },
    })),
    fallback: false,
  });
