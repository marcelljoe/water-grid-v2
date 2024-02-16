import protectAPI from '@/lib/protectApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { settingService } from '@/lib/services';
import { getLoginSession } from '@/lib/auth';
import { ISession } from '@/lib/interfaces/common';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set desired value here
    }
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized!', statusCode: 401 });
    }

    if (req.query.param == 'menu' && req.method == 'POST' && req.body.type == 'update') {
      await updateMenu(req, res, session);
      return;
    }

    if (req.query.param == 'menu' && req.method == 'POST' && req.body.type == 'delete') {
      await deleteMenu(req, res, session);
      return;
    }

    if (req.query.param == 'menu' && req.method == 'POST' && !req.body.type) {
      await createMenu(req, res, session);
      return;
    }

    if (req.query.type == 'delete' && req.query.param == 'users' && req.method == 'POST') {
      await deleteUser(req, res, session);
      return;
    }

    if (req.query.type == 'update' && req.query.param == 'users' && req.method == 'POST') {
      await updateUser(req, res, session);
      return;
    }

    if (req.query.type == 'updateProfile' && req.query.param == 'users' && req.method == 'POST') {
      await updateProfile(req, res, session);
      return;
    }

    if (req.query.param == 'users' && req.method == 'POST') {
      await createUser(req, res, session);
      return;
    }

    if (req.query.param == 'user') {
      await getUser(req, res, session);
      return;
    }

    if (req.query.param == 'menu') {
      await getMenu(req, res, session);
      return;
    }

    if (req.query.param == 'role' && req.method == 'POST' && req.body.type == 'delete') {
      await deleteRole(req, res, session);
      return;
    }
    if (req.query.param == 'role' && req.method == 'POST' && !req.body.type) {
      await createRole(req, res, session);
      return;
    }

    if (req.query.param == 'access') {
      await getAccess(req, res, session);
      return;
    }

    if (req.query.param == 'role') {
      await getRole(req, res, session);
      return;
    }

    if ((req.query.param = 'updatedRole')) {
      await updateRole(req, res, session);
      return;
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { rowPerPage, column, direction, page, key, status, startDate, endDate } = req.query;
  const query = `?rowPerPage=${rowPerPage}&column=${column}&direction=${direction}&page=${page}&key=${key}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
  const response = await settingService.getUser(session?.session as string, query);
  return res.status(200).json(response);
};

const getMenu = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await settingService.getMenu(session?.session as string);
  return res.status(200).json(response);
};

const createMenu = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await settingService.createMenu(req.body, session?.session as string);
  return res.status(200).json(response);
};

const updateMenu = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await settingService.updateMenu(req.body, session?.session as string);
  return res.status(200).json(response);
};

const deleteMenu = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await settingService.deleteMenu(req.body, session?.session as string);
  return res.status(200).json(response);
};

const getRole = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { rowPerPage, column, direction, page, key, status, startDate, endDate } = req.query;
  const query = `?rowPerPage=${rowPerPage}&column=${column}&direction=${direction}&page=${page}&key=${key}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
  const response = await settingService.getRole(session?.session as string, query);
  return res.status(200).json(response);
};

const createRole = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { description, status, menu } = req.body;

  const filteredMenu = menu.map((item: any) => ({
    id: item?.id,
    m_insert: item?.m_insert == true ? 1 : 0 || 0,
    m_delete: item?.m_delete == true ? 1 : 0 || 0,
    m_update: item?.m_update == true ? 1 : 0 || 0,
    m_view: item?.m_view == true ? 1 : 0 || 0,
    m_export: item?.m_export == true ? 1 : 0 || 0,
    m_import: item?.m_import == true ? 1 : 0 || 0
  }));

  const values = {
    role: description,
    mediaCode: '400',
    status: status,
    fullAccess: req.body?.fullAccess ? req.body.fullAccess : 0,
    accessMenu: filteredMenu
  };

  const response = await settingService.createRole(values, session?.session as string);
  return res.status(200).json(response);
};

const updateRole = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { description, status, menu, oldDescription } = req.body;

  const filteredMenu = menu.map((item: any) => ({
    id: item?.id,
    m_insert: item?.m_insert == true ? 1 : 0 || 0,
    m_delete: item?.m_delete == true ? 1 : 0 || 0,
    m_update: item?.m_update == true ? 1 : 0 || 0,
    m_view: item?.m_view == true ? 1 : 0 || 0,
    m_export: item?.m_export == true ? 1 : 0 || 0,
    m_import: item?.m_import == true ? 1 : 0 || 0
  }));

  const values = {
    role: description,
    mediaCode: '400',
    status: status,
    fullAccess: req.body?.fullAccess ? req.body.fullAccess : 0,
    accessMenu: filteredMenu,
    oldRole: oldDescription
  };

  const response = await settingService.updateRole(values, session?.session as string);
  return res.status(200).json(response);
};

const deleteRole = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const values = { role: req.body.description, mediaCode: '400' };
  const response = await settingService.deleteRole(values, session?.session as string);
  return res.status(200).json(response);
};

const getAccess = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const values = req.query.id;
  const response = await settingService.getAccessMenu(values, session?.session as string);
  return res.status(200).json(response);
};

const createUser = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const value = {
    hp: req.body.hp,
    password: req.body.password,
    name: req.body.name,
    roleId: req.body.role,
    username: req.body.username
  };
  const response = await settingService.createUser(session?.session as string, value);
  return res.status(200).json(response);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const value = {
    id: req.body.id,
    hp: req.body.hp,
    password: req.body.password,
    name: req.body.name,
    username: req.body.username,
    roleId: req.body.role,
    oldUsername: req.body.oldUsername
  };
  const response = await settingService.updateUser(session?.session as string, value);
  return res.status(200).json(response);
};

const updateProfile = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await settingService.updateUserProfile(session?.session as string, req.body);
  return res.json(response);
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const value = {
    id: req.body.id,
    username: req.body.username
  };
  const response = await settingService.deleteUser(session?.session as string, value);
  return res.status(200).json(response);
};

export default protectAPI(handler);
