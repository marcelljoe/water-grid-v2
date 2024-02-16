import protectAPI from '@/lib/protectApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { mailService } from '@/lib/services';
import { getLoginSession } from '@/lib/auth';
import { ISession } from '@/lib/interfaces/common';
import dayjs from 'dayjs';

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

    if (req.query.param == 'dashboard') {
      await getDashboard(req, res, session);
      return;
    }

    // if (req.query.param == 'dashboard_detail') {
    //   await getDashboardDetail(req, res, session);
    //   return;
    // }

    // if (req.query.param == 'dashboard_detail_pie') {
    //   await getDashboardDetailPie(req, res, session);
    //   return;
    // }

    if (req.query.param == 'dashboard_calender') {
      await getDashboardCalender(req, res, session);
      return;
    }

    if (req.query.param == 'inbox_internal') {
      await getInbox(req, res, session);
      return;
    }

    if (req.query.param == 'inbox_external') {
      await getInbox(req, res, session);
      return;
    }

    if (req.query.param == 'mail_template' && req.method == 'POST') {
      await saveMailTemplate(req, res, session);
      return;
    }

    if (req.query.param == 'update_mail_template' && req.method == 'POST') {
      await updateMailTemplate(req, res, session);
      return;
    }

    if (req.query.param == 'delete_mail_template' && req.method == 'POST') {
      await deleteMailTemplate(req, res, session);
      return;
    }

    if (req.query.param == 'mail_approval' && req.method == 'POST') {
      await mailApproval(req, res, session);
      return;
    }

    if (req.query.param == 'mail_send' && req.method == 'POST') {
      await sendMail(req, res, session);
      return;
    }

    if (req.query.param == 'mail_send_incoming' && req.method == 'POST') {
      await sendMailIncoming(req, res, session);
      return;
    }

    if (req.query.param == 'outbox_internal') {
      await getOutbox(req, res, session);
      return;
    }

    if (req.query.param == 'outbox_external') {
      await getOutbox(req, res, session);
      return;
    }

    if (req.query.param == 'inbox_detail') {
      await getDetailIncomingMail(req, res, session);
      return;
    }

    if (req.query.param == 'mail_template') {
      await getMailTemplate(req, res, session);
      return;
    }

    if (req.query.param == 'mail_template_byId') {
      await getMailTemplateById(req, res, session);
      return;
    }

    if (req.query.param == 'mail_template_byUUID') {
      await getMailTemplateByUUID(req, res, session);
      return;
    }

    if (req.query.param == 'mail_list_template_type') {
      await getListMailType(req, res, session);
      return;
    }

    if (req.query.param == 'mail_component') {
      await getComponent(req, res, session);
      return;
    }

    if (req.query.param == 'incoming_disposition' && req.method == 'POST') {
      await saveDispositionIncoming(req, res, session);
      return;
    }

    if (req.query.param == 'outcoming_disposition' && req.method == 'POST') {
      await saveDispositionOutcoming(req, res, session);
      return;
    }

    if (req.query.param == 'history') {
      await getHistory(req, res, session);
      return;
    }

    if (req.query.param == 'updateDisposition') {
      await updateDisposition(req, res, session);
      return;
    }

    if (req.query.param == 'updateIsRead' && req.method == 'POST') {
      await updateIsRead(req, res, session);
      return;
    }

    if (req.query.param == 'countunread') {
      await getCountUnread(req, res, session);
      return;
    }

    if (req.query.param == 'countunreadexternal') {
      await getCountUnreadExternal(req, res, session);
      return;
    }

    if (req.query.param == 'signature') {
      await getSignature(req, res, session);
      return;
    }

    if (req.query.param == 'sendGmail') {
      await sendGmailExternal(req, res, session);
      return;
    }

    if (req.query.param == 'draftDeleteOutbox') {
      await outboxDeleteDraft(req, res, session);
      return;
    }

    if (req.query.param == 'disposition') {
      await getGridDisposition(req, res, session);
      return;
    }

    if (req.query.param == 'unreadDisposition') {
      await getCountDisposition(req, res, session);
      return;
    }

    if (req.query.param == 'getCountInternalIncoming') {
      await getCountInternalIncoming(req, res, session);
      return;
    }

    if (req.query.param == 'getCountExternalIncoming') {
      await getCountExternalIncoming(req, res, session);
      return;
    }

    if (req.query.param == 'getCountInternalOutgoing') {
      await getCountInternalOutgoing(req, res, session);
      return;
    }

    if (req.query.param == 'getCountExternalOutgoing') {
      await getCountExternalOutgoing(req, res, session);
      return;
    }

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getInbox = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { rowPerPage, column, direction, page, key, status, startDate, endDate } = req.query;
  let type = req.query.param == 'inbox_internal' ? 1 : 2;
  const query = `?rowPerPage=${rowPerPage}&column=${column}&direction=${direction}&page=${page}&key=${key}&status=${status}&startDate=${startDate}&endDate=${endDate}`;

  const response = await mailService.getIncomingMail(session?.session as string, type, query);
  return res.status(200).json(response);
};

const getOutbox = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { rowPerPage, column, direction, page, key, status, startDate, endDate, statusLetter } = req.query;
  let type = req.query.param == 'outbox_internal' ? 1 : 2;
  const query = `?rowPerPage=${rowPerPage}&column=${column}&direction=${direction}&page=${page}&key=${key}&status=${status}&startDate=${startDate}&endDate=${endDate}&statusLetter=${statusLetter}`;
  const response = await mailService.getOutgoingMail(session?.session as string, type, query);
  return res.status(200).json(response);
};

const getMailTemplate = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { rowPerPage, column, direction, page, key, status, startDate, endDate }: any = req.query;
  const query = `?rowPerPage=${rowPerPage}&column=${column
    .split(' ')
    .join('')}&direction=${direction}&page=${page}&key=${key
    .split(' ')
    .join('')}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
  const response = await mailService.getMailTemplate(session?.session as string, query);
  return res.status(200).json(response);
};

const getMailTemplateById = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { mailId } = req.query;
  const response = await mailService.getMailTemplateById(session?.session as string, mailId as string);
  return res.status(200).json(response);
};

const getMailTemplateByUUID = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { uuid } = req.query;
  const response = await mailService.getMailTemplateByUUID(session?.session as string, uuid as string);
  return res.status(200).json(response);
};

const saveMailTemplate = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  let { name, header, opener, content, signature, footer, perforation, disposition, backletter } = req.body;
  const data = {
    templateName: name,
    documentType: 2,
    status: 1,
    componentId: [
      header?.id || null,
      opener?.id || null,
      content?.id || null,
      signature?.id || null,
      footer?.id || null,
      perforation?.id || null,
      disposition?.id || null,
      backletter?.id || null
    ].filter(id => id !== null && id !== undefined)
  };
  const response = await mailService.saveMailTemplate(data, session?.session as string);
  return res.status(200).json(response);
};

const updateMailTemplate = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  let { name, header, opener, content, signature, footer, perforation, disposition, backletter } = req.body;
  const data = {
    templateName: name,
    documentType: 2,
    status: 1,
    componentId: [
      header?.id || null,
      opener?.id || null,
      content?.id || null,
      signature?.id || null,
      footer?.id || null,
      perforation?.id || null,
      disposition?.id || null,
      backletter?.id || null
    ].filter(id => id !== null && id !== undefined)
  };
  const response = await mailService.updateMailTemplate(data, session?.session as string);
  return res.status(200).json(response);
};

const deleteMailTemplate = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  let { name, header, opener, content, signature, footer, perforation, disposition, backletter } = req.body;
  const data = {
    templateName: name,
    documentType: 2,
    status: 1,
    componentId: [
      header?.id || null,
      opener?.id || null,
      content?.id || null,
      signature?.id || null,
      footer?.id || null,
      perforation?.id || null,
      disposition?.id || null,
      backletter?.id || null
    ].filter(id => id !== null && id !== undefined)
  };
  const response = await mailService.deleteMailTemplate(data, session?.session as string);
  return res.status(200).json(response);
};

const mailApproval = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.mailApproval(session?.session as string, req.body);

  if (response?.statusCode > 200) {
    return res.status(response.statusCode).json(response);
  }
  return res.status(200).json(response);
};

const sendMail = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.sendMail(session?.session as string, req.body);
  return res.status(200).json(response);
};

const sendMailIncoming = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.sendMailIncoming(session?.session as string, req.body);
  return res.status(200).json(response);
};

const getDetailIncomingMail = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { id }: any = req.query;
  const response = await mailService.getDetailIncomingMail(session?.session as string, id);
  return res.status(200).json(response);
};

const getComponent = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getComponent(session?.session as string);
  return res.status(200).json(response);
};

const getListMailType = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const typeId = req.query.typeId as string;
  const response = await mailService.getListMailTemplateByType(session?.session as string, typeId);
  return res.status(200).json(response);
};

const saveDispositionIncoming = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { id, mailIncomingId, mailOutgoingId, employee, notes, date } = req.body;
  const filteredEmployee = employee.map((item: any) => ({
    id: item?.value
  }));
  const arrayOfIds = filteredEmployee.map((obj: any) => obj.id);
  const currentTime = dayjs();
  const combinedDateTime = dayjs(`${date} ${currentTime.format('HH:mm:ss.SSS')}`);
  const formattedDate = combinedDateTime.format('YYYY-MM-DD HH:mm:ss.SSS');

  const value = {
    mailIncomingId: mailIncomingId,
    mailOutgoingId: mailOutgoingId,
    employeeId: arrayOfIds,
    note: notes,
    dateDisposition: formattedDate
  };

  const response = await mailService.saveDispositionIncoming(session?.session as string, value);
  return res.status(200).json(response);
};

const saveDispositionOutcoming = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const {
    id,
    mailIncomingId,
    mailOutgoingId,
    employee,
    notes,
    date,
    doc_no,
    doc_date,
    subject,
    input_date,
    doc_origin,
    description
  } = req.body;
  const filteredEmployee = employee.map((item: any) => ({
    id: item?.value
  }));
  const arrayOfIds = filteredEmployee.map((obj: any) => obj.id);
  const currentTime = dayjs();
  const combinedDateTime = dayjs(`${date} ${currentTime.format('HH:mm:ss.SSS')}`);
  const formattedDate = combinedDateTime.format('YYYY-MM-DD HH:mm:ss.SSS');
  const combinedInputDateTime = dayjs(`${input_date} ${currentTime.format('HH:mm:ss.SSS')}`);
  const formattedInputDate = combinedInputDateTime.format('YYYY-MM-DD HH:mm:ss.SSS');
  const value = {
    mailIncomingId: mailIncomingId,
    mailOutgoingId: mailOutgoingId,
    employeeId: arrayOfIds,
    note: notes,
    dateDisposition: formattedDate,
    doc_no: doc_no,
    doc_date: doc_date,
    subject: subject,
    doc_origin: doc_origin,
    description: description,
    input_date: formattedInputDate
  };
  const response = await mailService.saveDispositionOutcoming(session?.session as string, value);
  return res.status(200).json(response);
};

const getHistory = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getHistory(session?.session as string, req.query.history, req.query.type);
  return res.status(200).json(response);
};

const getDashboard = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getDashboard(session?.session as string);
  return res.status(200).json(response);
};

const getDashboardCalender = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const query = `start=${req.query.start}&end=${req.query.end}`;
  const response = await mailService.getDashboardCalender(session?.session as string, query);

  return res.status(200).json(response);
};

const updateDisposition = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { mailId, type } = req.body;

  const values = {
    mailId: mailId,
    type: type
  };

  const response = await mailService.updateDisposition(session?.session as string, values);
  return res.status(200).json(response);
};

const updateIsRead = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.updateIsRead(session?.session as string, req.body);
  return res.status(200).json(response);
};

const getCountUnread = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountUnreadInternal(session?.session as string);
  return res.status(200).json(response);
};

const getCountUnreadExternal = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountUnreadExternal(session?.session as string);
  return res.status(200).json(response);
};

const getSignature = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getSignature(session?.session as string, req.query.id);
  return res.status(200).json(response);
};

const sendGmailExternal = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.sendGmailExternal(session?.session as string, req.body);
  return res.status(200).json(response);
};

const outboxDeleteDraft = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.outboxDraftDelete(session?.session as string, req.body);
  if (response?.statusCode > 200) {
    return res.status(response.statusCode).json(response);
  }
  return res.status(200).json(response);
};

const getGridDisposition = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const { rowPerPage, column, direction, page, key, status, startDate, endDate } = req.query;
  const query = `?rowPerPage=${rowPerPage}&column=${column}&direction=${direction}&page=${page}&key=${key}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
  const response = await mailService.getDispositionMail(session?.session as string, query);
  return res.status(200).json(response);
};

const getCountDisposition = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountDisposition(session?.session as string);
  return res.status(200).json(response);
};

const getCountInternalIncoming = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountIncoming(session?.session as string, 1);
  return res.status(200).json(response);
};

const getCountInternalOutgoing = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountOutgoing(session?.session as string, 1);
  return res.status(200).json(response);
};

const getCountExternalIncoming = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountIncoming(session?.session as string, 2);
  return res.status(200).json(response);
};

const getCountExternalOutgoing = async (req: NextApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const response = await mailService.getCountOutgoing(session?.session as string, 2);
  return res.status(200).json(response);
};

export default protectAPI(handler);
