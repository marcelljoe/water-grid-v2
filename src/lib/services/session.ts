import { http } from '@/utils/httpClient';

export interface IAccess {
  m_insert: number;
  m_update: number;
  m_delete: number;
  m_view: number;
  m_approve: number;
  m_disposition: number;
}

export interface Menu {
  id: number;
  header: number;
  menu: string;
  path: string;
  level: number;
  icon: string | null;
  child: Menu[];
}

export interface ISessionProfile {
  id: number;
  name: string;
  role: string;
  accessId: number;
  menu: Menu[];
}

interface IError {
  statusCode: number;
  message: string;
  data: { message: string };
}

const getSessionAccess = async (path: string, token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/auth/protected-route?path=${path}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    //   loggerUtils.error(`shared.getProductPageStructure, ${error}`);
    return error as IError;
  }
};

const getSessionProfile = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/user/me`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    //   loggerUtils.error(`shared.getProductPageStructure, ${error}`);
    return null;
  }
};

const getFirstMenu = async (token: string): Promise<string | IError> => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/access/first/menu`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    return error as IError;
  }
};

const getRoles = async (token: string): Promise<string | IError> => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/employee/department`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    return error as IError;
  }
};

const exportedObject = {
  getSessionAccess,
  getSessionProfile,
  getFirstMenu,
  getRoles
};

export default exportedObject;
