import { NextApiRequest, NextApiResponse } from 'next';
import { getUserAuthHeader } from '../../../modules/auth/server';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const authHeader:any = await getUserAuthHeader(req);

  // HACK: don't do this, this is just for demo purposes
  res.json((authHeader.Authorization) ? authHeader : null);
}