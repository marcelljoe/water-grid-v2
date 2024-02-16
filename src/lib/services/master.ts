import { http } from '@/utils/httpClient';

export interface IAccess {
  m_insert: number;
  m_update: number;
  m_delete: number;
  m_view: number;
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

const getMasterEmployee = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/employee?${query}`, {
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

const getMasterApprover = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/approver?${query}`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    //   loggerUtils.error(`shared.getProductPageStructure, ${error}`);
    return error;
  }
};

const getMasterEmployeeLogin = async (token: string, id: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/employee/profile/${id}`, {
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

const getMasterEmployeeDepartment = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/employee/department`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    //   loggerUtils.error(`shared.getProductPageStructure, ${error}`);
    return error;
  }
};

const getAccessRole = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/access`, {
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

const exportedObject = {
  getMasterEmployee,
  getMasterEmployeeDepartment,
  getAccessRole,
  getMasterApprover,
  getMasterEmployeeLogin
};

export default exportedObject;
