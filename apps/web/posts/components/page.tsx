import styled from '@emotion/styled';
import { Breadcrumbs, Text } from '@geist-ui/core';
import { type MDXProvider } from '@mdx-js/react';
import { type GetStaticPaths, type GetStaticProps } from 'next';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Layout } from '../../components/Layout';
import { MDXRemote } from '../../components/MDXRemote';

// import { type Post, type PostCategoryType } from '../lib/get-posts';

export type PostCategoryType = 'blog' | 'tweets' | 'memex';

export type PostSummary = {
  emoji?: string;
  title: string;
  slug: string;
  description?: string;
  date?: string;
};

export type Post = PostSummary & {
  body: string;
};

export type BlogPageProps = MDXRemoteSerializeResult & {
  type: PostCategoryType;
  meta: Omit<Post, 'body'>;
};

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
};

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const BlogPage: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  return (
    <Layout defaultPostListProps={{ initialExpand: true }}>
      <Breadcrumbs>
        <Breadcrumbs.Item>Paracøsm</Breadcrumbs.Item>
        <Breadcrumbs.Item>{capitalize(props.type)}</Breadcrumbs.Item>
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
      <MDXRemote {...props} components={components} />
    </Layout>
  );
};

const Title = styled(Text)`
  margin-top: 42px;

  font-weight: 900;
  line-height: 1.25;
  margin-bottom: 1.5rem;
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
  const md = require('../lib/get-posts') as {
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
