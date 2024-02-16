import { http } from '@/utils/httpClient';

interface IError {
  statusCode: number;
  message: string;
  data: { message: string };
}

const getIncomingMail = async (token: string, type: number, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/type/${type}${query}`, {
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

const getOutgoingMail = async (token: string, type: number, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/type/${type}${query}`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getDispositionMail = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/disposition/grid${query}`, {
      headers: {
        authentication: token
      }
    });

    return response.data.data;
  } catch (error) {
    return null;
  }
};

const createInbox = async (token: string, value: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/inbox/create`, value, {
      headers: {
        authentication: token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    return error as IError;
  }
};

const getMailTemplate = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/mail-template${query}`, {
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

const getListMailTemplateByType = async (token: string, typeId: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/mail-template/list/${typeId}`, {
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

const getMailTemplateById = async (token: string, mailId: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/mail-template/${mailId}`, {
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

const getMailTemplateByUUID = async (token: string, uuid: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/mail/edit?uuid=${uuid}`, {
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

const getMailTemplateByName = async (token: string, mailName: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/mail-template/name/${mailName}`, {
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

const saveMailTemplate = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/mail-template/create`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const updateMailTemplate = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/mail-template/edit`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const deleteMailTemplate = async (data: any, token: string) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/mail-template/delete`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const saveDispositionIncoming = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/inbox/disposition`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const saveDispositionOutcoming = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/outbox/disposition`, data, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const saveOutgoingMail = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/outbox/save`, data, {
      headers: {
        authentication: token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const editOutgoingMail = async (token: string, data: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/outbox/edit`, data, {
      headers: {
        authentication: token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const getComponent = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/master/component`, {
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

const getDashboard = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/dashboard`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getDashboardDetail = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/dashboard/1`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getDashboardDetailPie = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/dashboard/2`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getDashboardCalender = async (token: string, query: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/dashboard/calender?${query}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getHistory = async (token: string, id: any, type: any) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/disposition/mail/${id}?type=${type}`, {
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

const getHistoryApproved = async (token: string, id: any) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/approval/getHistoryApproved/${id}`, {
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

const getDetailIncomingMail = async (token: string, id: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/${id}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getDetailOutgoingMail = async (token: string, id: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/${id}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getDispositionEmployee = async (token: string, type: number) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/disposition/employee/${type}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const updateDisposition = async (token: string, values: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/disposition/updateStatus`, values, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const updateIsRead = async (token: string, values: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/${values.type}/update/is_read`, values, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const getCountUnreadInternal = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/unreadInternal`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getCountUnreadExternal = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/unreadExternal`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getInitiateMailValue = async (token: string, type: string, method: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/initiate_value/${type}?method=${method}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getSignature = async (token: string, id: any) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/signature/${id}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const mailApproval = async (token: string, body: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/approval`, body, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const mailSignature = async (id: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/approval/signature/${id}`);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const sendMail = async (token: string, body: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/outbox/send`, body, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const sendMailIncoming = async (token: string, body: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/inbox/send`, body, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const sendGmailExternal = async (token: string, body: any) => {
  try {
    const formData = new FormData();
    formData.append('email', body.email);
    formData.append('subject', body.subject);
    formData.append('text', body.text);
    formData.append('attachment', body.attachment[0].attachment);
    formData.append('originalFilename', body.attachment[0].originalFilename);
    formData.append('filename', body.attachment[0].filename);
    const response = await http.post(`${process.env.API_SERVICE}/api/outbox/sendMailEksternal`, formData, {
      headers: {
        authentication: token
      }
    });

    // return response.data;
    return response.data;
  } catch (error) {
    return error;
  }
};

const getValidationPosition = async (token: string, body: any) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/approval/validMailPosition?mailId=${body}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const outboxDraftDelete = async (token: string, body: any) => {
  try {
    const response = await http.post(`${process.env.API_SERVICE}/api/outbox/delete`, body, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return error;
  }
};

const getCountDisposition = async (token: string) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/disposition/unreadDisposition`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getCountOutgoing = async (token: string, type: number) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/outbox/outbox/countOutgoing?type=${type}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const getCountIncoming = async (token: string, type: number) => {
  try {
    const response = await http.get(`${process.env.API_SERVICE}/api/inbox/inbox/countIncoming?type=${type}`, {
      headers: {
        authentication: token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
};

const exportedObject = {
  getIncomingMail,
  getOutgoingMail,
  getMailTemplate,
  getListMailTemplateByType,
  getMailTemplateById,
  getMailTemplateByUUID,
  getMailTemplateByName,
  getComponent,
  saveMailTemplate,
  updateMailTemplate,
  deleteMailTemplate,
  createInbox,
  getDispositionEmployee,
  saveDispositionIncoming,
  saveDispositionOutcoming,
  saveOutgoingMail,
  editOutgoingMail,
  getHistory,
  getDetailIncomingMail,
  getDetailOutgoingMail,
  getDashboard,
  getDashboardDetail,
  getDashboardDetailPie,
  getDashboardCalender,
  updateDisposition,
  updateIsRead,
  getCountUnreadInternal,
  getCountUnreadExternal,
  getSignature,
  mailApproval,
  mailSignature,
  sendMail,
  sendMailIncoming,
  getInitiateMailValue,
  sendGmailExternal,
  getHistoryApproved,
  getValidationPosition,
  outboxDraftDelete,
  getDispositionMail,
  getCountDisposition,
  getCountOutgoing,
  getCountIncoming
};

export default exportedObject;
