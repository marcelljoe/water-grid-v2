import { FormikProps, FormikValues } from 'formik';
import { ITemplate } from '../Form/Form.types';

export interface ViewTemplateProps {
  values: ITemplate;
  mailSignature?: ISignature[];
  mailDisposition?: ISignature[];
  formik?: FormikProps<ITemplate>;
}

interface ISignature {
  approvedBy: any;
  qr_url: string;
  status: number;
  sort: number;
  approved_at: string;
}
