import protectAPI from '@/lib/protectApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { masterService } from '@/lib/services';
import { getLoginSession } from '@/lib/auth';
import { ISession } from '@/lib/interfaces/common';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized!', statusCode: 401 });
    }

    if (req.query.param == 'employee') {
      await getEmployee(req, res, session);
      return;
    }

    if (req.query.param == 'direksi') {
      await getEmployee(req, res, session, 'direksi');
      return;
    }

    if (req.query.param == 'dirut') {
      await getEmployee(req, res, session, req.query.param);
      return;
    }

    if (req.query.param == 'department') {
      await getMasterEmployeeDepartment(req, res, session);
      return;
    }

    if (req.query.param == 'access') {
      await getAccessRole(req, res, session);
      return;
    }

    if (req.query.param == 'approver') {
      await getMasterApprover(req, res, session);
      return;
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getEmployee = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: ISession | undefined,
  param?: string
) => {
  const { department, mailTypeId } = req.query;
  let mailType = req.query.mailType as string;

  if (param == 'dirut') mailType = '2';

  let query = '';
  query += department ? `department=${department}` : '';
  query += mailType ? `mailType=${mailType}&mailTypeId=${mailTypeId}` : '';
  query += param == 'direksi' ? `&type=${param}` : '';
  const response = await masterService.getMasterEmployee(session?.session as string, query);
  return res.status(200).json(response);
};

const getMasterEmployeeDepartment = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: ISession | undefined
) => {
  const response = await masterService.getMasterEmployeeDepartment(session?.session as string);
  return res.status(200).json(response);
};

const getAccessRole = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await masterService.getAccessRole(session?.session as string);
  return res.status(200).json(response);
};

const getMasterApprover = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const query = `mailType=${req.query.mailType}&mailTypeId=${req.query.mailTypeId}`;
  const response = await masterService.getMasterApprover(session?.session as string, query);
  return res.status(200).json(response);
};

export default protectAPI(handler);
