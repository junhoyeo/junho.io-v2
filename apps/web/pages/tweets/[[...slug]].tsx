import { Text } from '@geist-ui/core';
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Layout } from '../../components/Layout';
import { MDXRemote } from '../../components/MDXRemote';
import { getPosts, type Post } from '../../lib/get-posts';

type Props = MDXRemoteSerializeResult & {
  meta: Omit<Post, 'body'>;
};

const components = {};

const TweetPage: NextPage<Props> = (props: Props) => {
  return (
    <Layout defaultPostListProps={{ initialExpand: true }}>
      <Text h1>{props.meta.title}</Text>
      <MDXRemote {...props} components={components} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = ((params?.slug || []) as string[]).join('/');

  const posts = getPosts('tweets');
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
      ...serializedResult,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getPosts('tweets').map((p) => ({
      params: { slug: !p.slug ? [''] : p.slug.split('/') },
    })),
    fallback: false,
  };
};

export default TweetPage;
