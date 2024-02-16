import { Dispatch, SetStateAction } from 'react';

export interface IncomingMailInitialValue {
  letterNumber: string;
  letterDate: string;
  regarding: string;
  letterFrom: string;
  letterDescription: string;
  attachment: string;
  employee: any[];
  notes?: string;
}

export interface DetailInfoList {
  statusLabel?: string;
  statusType?: number;
  title: string;
  value: string;
  icon: React.JSX.Element;
}

export interface DispositionInitialValue {
  doc_no: string;
  doc_date: string;
  input_date: string;
  status: number;
  subject: string;
  employee: any[] | null;
  notes?: string;
  date: any;
}

export interface PropsIncomingMailForm {
  handleClose: () => void;
  setOpenSnack: Dispatch<SetStateAction<boolean>>;
}

export interface PropsDispositionForm {
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  values: DispositionInitialValue;
  handleClose?: () => void;
  updatedData?: any;
  employee: any;
  type?: string;
}

export interface DispositionOutgoingInitialValue {
  name: string;
  code: string;
  input_date: string;
  status: number;
  employee: any[];
  notes?: string;
  date: any;
}
export interface PropsDispositionOutgoingForm {
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  values: DispositionOutgoingInitialValue;
  handleClose?: () => void;
  updatedData?: any;
  employee: any;
}
