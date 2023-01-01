import styled from '@emotion/styled';
import { Breadcrumbs, Text, useTheme } from '@geist-ui/core';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';

import { Layout } from '@/components/Layout';
import { MDXRenderer } from '@/components/mdx-renderer';

import type { Post, PostCategoryType, PostDocument } from '../lib/types';

export type BlogPageProps = PostDocument;

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const BlogPage: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  const { palette } = useTheme();

  return (
    <Layout>
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
    </Layout>
  );
};

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
    const serializedResult = await serialize(body);

    return {
      props: {
        meta,
        type,
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
