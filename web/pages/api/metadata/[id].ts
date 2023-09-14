/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-return-await */
import type { NextApiRequest, NextApiResponse } from 'next';

type APIHandler = <T extends NextApiResponse = NextApiResponse>(
  req: any,
  res: T,
) => Promise<void>;

const ALLOWED_ORIGINS = ['https://bento.finance', 'http://localhost:3000'];

export const withCORS =
  (apiHandler: APIHandler): APIHandler =>
  async (req, res) => {
    const origin = req.headers.origin;
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    return await apiHandler(req, res);
  };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  res.status(200).json({
    token_id: id,
    name: `JUNO #${id}`,
    image: `https://raw.githubusercontent.com/junhoyeo/paracosm/main/.github/images/juno-1.png`,
  });
}
