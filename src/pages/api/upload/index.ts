import { getLoginSession } from '@/lib/auth';
import { mailService } from '@/lib/services';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
const multer = require('multer');
const appRoot = require('app-root-path');
import { randString } from '@/utils/helper';
import { ISession } from '@/lib/interfaces/common';

export type SuccessfulResponse<T> = { data: T; error?: never; statusCode?: number };
export type UnsuccessfulResponse<E> = { data?: never; error: E; statusCode?: number };

export type ApiResponse<T, E = unknown> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}

type ResponseData = ApiResponse<string[], string>;
export const config = {
  api: {
    bodyParser: false
  }
};

const handler = nc({
  onError(error, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, `${appRoot}/../public/mail_attachment/`);
  },
  filename: function (req: any, file: any, cb: any) {
    const refId: string = `${dayjs().unix()}-${randString(10, '1234567890POIUYTREWQASDFGHJKLMNBVCXZ', '')}`;
    const ext = file.originalname.split('.').pop();
    cb(null, `${refId}.${ext}`.replace(/\s/g, ''));
  }
});

let stor = multer.memoryStorage();

let upload = multer({
  storage: stor
  //   fileFilter: function (req: any, file: any, cb: any) {
  //     // checkFileType(file, cb);
  // }
});

let uploadFile = upload.array('file');
handler.use(uploadFile);
handler.post(async (req: NextConnectApiRequest, res: NextApiResponse) => {
  const session = await getLoginSession(req);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized!', statusCode: 401 });
  }

  if (req.body.param == 'outcoming_save') {
    await saveOutcomingMail(req, res, session);
    return;
  }

  if (req.body.param == 'outcoming_edit') {
    await editOutcomingMail(req, res, session);
    return;
  }

  const newFormData = new FormData();
  newFormData.append('doc_no', req.body.doc_no);
  newFormData.append('doc_date', req.body.doc_date);
  newFormData.append('subject', req.body.regard);
  newFormData.append('doc_origin', req.body.doc_from);
  newFormData.append('description', req.body.description);
  req.files.forEach(file =>
    newFormData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname)
  );
  newFormData.append('type', req.body.type);
  const response = await mailService.createInbox(session?.session as string, newFormData);
  if (response?.statusCode > 200) {
    return res.status(response.statusCode).json(response);
  }
  return res.status(200).json(response);
});

const saveOutcomingMail = async (req: NextConnectApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const formData = new FormData();
  const jsonBody = req.body as any;
  for (var key in jsonBody) {
    formData.append(key, jsonBody[key]);
  }
  req.files.forEach(file =>
    formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname)
  );

  const response = await mailService.saveOutgoingMail(session?.session as string, formData);
  if (response?.statusCode > 200) {
    return res.status(response.statusCode).json(response);
  }
  return res.status(200).json(response);
};

const editOutcomingMail = async (req: NextConnectApiRequest, res: NextApiResponse, session: ISession | undefined) => {
  const formData = new FormData();
  const jsonBody = req.body as any;
  for (var key in jsonBody) {
    formData.append(key, jsonBody[key]);
  }
  req.files.forEach(file =>
    formData.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname)
  );

  const response = await mailService.editOutgoingMail(session?.session as string, formData);
  if (response?.statusCode > 200) {
    return res.status(response.statusCode).json(response);
  }
  return res.status(200).json(response);
};

export default handler;
