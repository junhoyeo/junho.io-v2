import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

export type Post = {
  title: string;
  date: string;
  slug: string;
  body: string;
};

export const getPosts = (): Post[] => {
  const posts = fs
    .readdirSync('./posts/')
    .filter((file) => path.extname(file) === '.md')
    .flatMap((file) => {
      const postContent = fs.readFileSync(`./posts/${file}`, 'utf8');
      const { data, content } = matter(postContent);

      if (data.published === false) {
        return [];
      }

      return { ...data, body: content } as Post;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
};
