import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

export type PostSummary = {
  title: string;
  slug: string;
  description?: string;
  date?: string;
};

export type Post = PostSummary & {
  body: string;
};

export const getPosts = (type: 'blog' | 'tweets'): Post[] => {
  const posts = fs
    .readdirSync(`./posts/${type}`)
    .filter((file) => path.extname(file) === '.md')
    .flatMap((file) => {
      const postContent = fs.readFileSync(`./posts/${type}/${file}`, 'utf8');
      const { data, content } = matter(postContent);

      if (data.published === false) {
        return [];
      }

      return {
        ...data,
        slug: (data.slug as string) || '',
        body: content,
      } as Post;
    })
    .sort((a, b) =>
      !b.date || !a.date
        ? 0
        : new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  return posts;
};
