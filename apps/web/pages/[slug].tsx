import { Text } from '@geist-ui/core';
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next';
import { type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Layout } from '../components/Layout';
import { MDXRemote } from '../components/MDXRemote';
import { getPosts, type Post } from '../lib/get-posts';

type Props = MDXRemoteSerializeResult & {
  meta: Omit<Post, 'body'>;
};

const components = {};

const PostPage: NextPage<Props> = (props: Props) => {
  return (
    <Layout>
      <Text h1>{props.meta.title}</Text>
      <MDXRemote {...props} components={components} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string) || '';
  const posts = getPosts();
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
    paths: getPosts().map((p) => `/${p.slug}`),
    fallback: false,
  };
};

export default PostPage;
