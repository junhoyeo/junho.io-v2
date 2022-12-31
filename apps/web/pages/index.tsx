import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'node:fs';

import type { Post } from '@/posts/lib/types';

export { default } from '@/home/HomePage';

export const getStaticProps = async () => {
  const postContent = fs.readFileSync(`./posts/data/home.mdx`, 'utf8');
  const { data, content } = matter(postContent);

  if (data.published === false) {
    return [];
  }

  const post = {
    ...data,
    slug: (data.slug as string) || '',
    body: content,
  } as Post;

  const { body, ...meta } = post;
  const serializedResult = await serialize(body);

  return {
    props: {
      meta,
      ...serializedResult,
    },
  };
};
