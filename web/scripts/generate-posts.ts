import { promises as fs } from 'node:fs';
import { format } from 'prettier';
import { getPosts } from '@/posts/lib/get-posts';
import { type PostCategoryType } from '@/posts/lib/types';

const savePostsWithoutBody = async (type: PostCategoryType): Promise<void> => {
  const blogPosts = getPosts(type);
  const blogPostsWithoutBody = blogPosts.map(
    ({ body: _body, slug, ...rest }) => ({ ...rest, slug: slug || '' }),
  );

  await fs.writeFile(
    `./posts/generated/${type}.ts`,
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await format(
      `
      import type { PostSummary } from '@/posts/lib/types';

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
  await Promise.all([savePostsWithoutBody('blog')]);
};

main()
  .then(() => {
    console.log('✅ Done writing post summaries');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
