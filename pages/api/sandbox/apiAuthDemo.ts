import { NextApiRequest, NextApiResponse } from 'next';
import { serviceAuth } from '../../../modules/auth/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const serviceResponse:any = await serviceAuth('admin', 'aidminutes');

  // HACK: don't do this, this is just for demo purposes
  res.json(serviceResponse);
}