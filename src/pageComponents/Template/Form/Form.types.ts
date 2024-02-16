import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import { FormikProps } from 'formik';

interface IValue {
  id: number;
  code: string;
  value?: any;
}

export interface ITemplate {
  isDraft?: false;
  mailTypeId?: optionType;
  type?: string;
  name: string;
  header: IValue | null;
  opener: IValue | undefined;
  content: IValue | undefined;
  signature: IValue | undefined;
  footer: IValue | undefined;
  perforation: IValue | undefined;
  disposition: IValue | undefined;
  backLetter: IValue | undefined;
  value?: any;
  attachmentLength?: optionType | undefined;
  user?: {
    position: string;
    department: string;
    headPosition: string;
  };
}

export interface CreateTemplateFormProps {
  open?: boolean;
  master: {
    component: IComponent;
  };
}

export interface IComponent {
  header: {
    item: IItemComponent[];
  };
  opener: {
    item: IItemComponent[];
  };
  content: {
    item: IItemComponent[];
  };
  signature: {
    item: IItemComponent[];
  };
  footer: {
    item: IItemComponent[];
  };
  disposition: {
    item: IItemComponent[];
  };
  backLetter: {
    item: IItemComponent[];
  };
}

interface IItemComponent {
  value: number;
  label: string;
}
