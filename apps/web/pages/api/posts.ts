import { type NextApiRequest, type NextApiResponse } from 'next';

import { getPosts } from '../../lib/get-posts';

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  const posts = getPosts();
  res.json(posts.map(({ body: _body, ...v }) => v));
};

// eslint-disable-next-line import/no-default-export
export default handler;
