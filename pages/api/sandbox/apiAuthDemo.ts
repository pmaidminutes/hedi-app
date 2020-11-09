import { NextApiRequest, NextApiResponse } from 'next';
import { serviceAuth } from '../../../modules/auth/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const pwd = req.query?.pwd;
  if (pwd && typeof pwd === 'string') {
    const serviceResponse:any = await serviceAuth('admin', pwd);

    // HACK: don't do this, this is just for demo purposes
    res.json(serviceResponse);
  } else {
    res.json({notice: 'service not logged in'});
  }
}