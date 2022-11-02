import { promises as fs } from 'node:fs';
import { format } from 'prettier';

import { getPosts } from '../lib/get-posts';

const main = async (): Promise<void> => {
  const posts = getPosts();
  const postsWithoutBody = posts.map(({ body: _body, ...v }) => v);

  await fs.writeFile(
    './lib/constants/posts.json',
    format(JSON.stringify(postsWithoutBody), { parser: 'json' }),
    'utf8',
  );
};

main()
  .then(() => {
    console.log('✅ Done writing post summaries');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
