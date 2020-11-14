import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthHeader, getServiceAuth, IsIHTTPError } from '../../../modules/auth/server';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const pwd = req.query?.pwd;
  if (pwd && typeof pwd === 'string') {
    const serviceResponse:any = await getServiceAuth('admin', pwd);
    if (!IsIHTTPError(serviceResponse)) {
      const header = getAuthHeader(serviceResponse);
      // use this header to make authenticated api calls
    }
    // HACK: don't do this, this is just for demo purposes
    res.json(serviceResponse);
  } else {
    res.json({notice: 'service not logged in'});
  }
}