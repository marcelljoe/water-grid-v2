import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
const multer = require('multer');
import path from 'path';
const appRoot = require('app-root-path');
import { getLoginSession } from '@/lib/auth';
import { mailService } from '@/lib/services';
const fs = require('fs');

export type SuccessfulResponse<T> = {
  data: T;
  error?: never;
  statusCode?: number;
};
export type UnsuccessfulResponse<E> = {
  data?: never;
  error: E;
  statusCode?: number;
};

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
    cb(null, `${appRoot}/../public/`);
  },
  filename: function (req: any, file: any, cb: any) {
    const files: string = file.originalname.replace(/\s/g, '');
    cb(null, +Date.now() + files);
  }
});

let upload = multer({
  storage: storage
});

let uploadFile = upload.single('file');
handler.use(uploadFile);
handler.post(async (req: any, res: any) => {
  const session = await getLoginSession(req);

  const body = {
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    file: req.file
  };
  const filePath = body.file.path;
  const fileContent = fs.readFileSync(filePath);

  const mailOptions = {
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
    attachment: [
      {
        filename: body.file.filename,
        originalFilename: body.file.originalname, // Set your desired file name
        attachment: fileContent // File content as buffer
      }
    ]
  };
  // transporter.sendMail(mailOptions, (error: any, info: any) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
  const response = await mailService.sendGmailExternal(session?.session as string, mailOptions);
});

export default handler;
