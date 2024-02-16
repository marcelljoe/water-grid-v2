import { NextApiRequest, NextApiResponse } from 'next';
import { removeTokenCookie } from '@lib/auth-cookies';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.param == 'logout') {
    removeTokenCookie(res);
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  if (req.query.param == 'session_expired') {
    removeTokenCookie(res);
    res.send(200);
  }
}
