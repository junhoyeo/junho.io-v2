import { promises as fs } from 'node:fs';
import { format } from 'prettier';

import { getPosts, type PostCategoryType } from '../lib/get-posts';

const savePostsWithoutBody = async (type: PostCategoryType): Promise<void> => {
  const blogPosts = getPosts(type);
  const blogPostsWithoutBody = blogPosts.map(
    ({ body: _body, slug, ...rest }) => ({ ...rest, slug: slug || '' }),
  );

  await fs.writeFile(
    `./lib/constants/posts/${type}.ts`,
    format(
      `
      import { type PostSummary } from '../../get-posts';
      const posts: PostSummary[] = ${JSON.stringify(blogPostsWithoutBody)};

      // eslint-disable-next-line import/no-default-export
      export default posts;
    `,
      { parser: 'typescript' },
    ),
    'utf8',
  );
};

const main = async (): Promise<void> => {
  await Promise.all([
    savePostsWithoutBody('blog'),
    savePostsWithoutBody('tweets'),
    savePostsWithoutBody('research'),
  ]);
};

main()
  .then(() => {
    console.log('✅ Done writing post summaries');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
