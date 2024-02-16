import protectAPI from '@/lib/protectApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@/lib/auth';
import * as model from './_model';
import { getProfile } from '../session/[param]';
import { sessionService } from '@/lib/services';

export const getWebServices = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getLoginSession(req);
    let dept = await sessionService.getSessionProfile(session?.session as string);
    dept.deptId = 1;
    const deptId = Number(dept.deptId as any);
    const response = await model.getLinks(deptId);
    return response;
  } catch (error) {
    return error;
  }
};
