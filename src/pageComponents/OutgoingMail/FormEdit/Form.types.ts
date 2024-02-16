import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import { ITemplate } from '@/pageComponents/Template/Form/Form.types';
import { FormikProps } from 'formik';

export interface UpdateTemplateFormProps {
  formik: FormikProps<ITemplate>;
  open: boolean;
  master: {
    template: optionType[];
    department: optionType[];
    approver: optionType[];
  };
  mailType: string;
  uuid: string;
  method: 'edit' | 'create';
}

export interface IMailTemplate {
  id: number;
  templateName: string;
  component: {
    header: IMailTemplateComponent;
    opener: IMailTemplateComponent;
    content: IMailTemplateComponent;
    signature: IMailTemplateComponent;
    footer: IMailTemplateComponent;
    perforation: IMailTemplateComponent;
    disposition: IMailTemplateComponent;
    backLetter: IMailTemplateComponent;
  };
}

interface IMailTemplateComponent {
  name: string;
  item: IMailTemplateItem[];
}

interface IMailTemplateItem {
  description: string;
  component: 'TextField';
  field_type: string;
}
