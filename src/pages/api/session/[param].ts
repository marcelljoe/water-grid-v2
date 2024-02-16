import protectAPI from '@/lib/protectApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { masterService, sessionService } from '@/lib/services';
import { getLoginSession } from '@/lib/auth';
import { ISession } from '@/lib/interfaces/common';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized!', statusCode: 401 });
    }

    if (req.query.param == 'access') {
      await getAccess(req, res, session);
      return;
    }

    if (req.query.param == 'profile') {
      await getProfile(req, res, session);
      return;
    }

    if (req.query.param == 'profile-detail') {
      await getProfileDetail(req, res, session);
      return;
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAccess = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const path = req.query.path?.toString().substring(1) as string;
  const response = await sessionService.getSessionAccess(path, session?.session as string);
  if (response?.statusCode > 200) {
    return res.status(response.statusCode).json(response);
  }
  return res.status(200).json(response);
};

export const getProfile = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await sessionService.getSessionProfile(session?.session as string);

  return res.status(200).json(response);
};

const getProfileDetail = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await sessionService.getSessionProfile(session?.session as string);

  const employeeLogin = await masterService.getMasterEmployeeLogin(session?.session as string, response?.employeeId);

  return res.status(200).json(employeeLogin);
};

export default protectAPI(handler);
