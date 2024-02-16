import { http } from '@/utils/httpClient';

const getUser = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/user${query}`, {
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

const getMenu = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/menu`, {
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

const getRole = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/access${query}`, {
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

const createRole = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/access/create`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const updateRole = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/access/update`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const deleteRole = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/access/delete`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getAccessMenu = async (data: any, token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/access/${data}`, {
      headers: { authentication: token }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const createMenu = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/menu/create`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const createUser = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/user/create`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const updateUser = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/user/update`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const deleteUser = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/user/delete`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const updateMenu = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/menu/update`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const deleteMenu = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/menu/delete`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const updateUserProfile = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/user/updateProfile`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const exportedObject = {
  getUser,
  getMenu,
  getRole,
  createMenu,
  updateMenu,
  deleteMenu,
  createRole,
  deleteRole,
  updateRole,
  getAccessMenu,
  createUser,
  updateUser,
  deleteUser,
  updateUserProfile
};

export default exportedObject;
