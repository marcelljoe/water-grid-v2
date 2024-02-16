import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import { ITemplate } from '@/pageComponents/Template/Form/Form.types';
import { FormikProps } from 'formik';

export interface GreetingsComponentProps {
  code: GreetingsEnum;
  values?: {
    type: string;
    Dari: string;
    docNo: string;
    diTempat?: string;
    Judul?: string;
    ['Dasar Penugasan']?: string;
    ['Tanggal']?: string;
    letterDate?: string;
    ['Nomor Referensi']?: string;
    Perihal?: string;
    subject?: string;
    ['Kata Pengantar']?: string;
    ['Sifat']?: string;
    ['Derajat']?: string;
    ['Permohonan Dari']?: string;
    ['Sejumlah']?: string;
    ['Untuk Keperluan']?: string;
    ['Kode Perkiraan']?: string;
    ['Nama Perkiraan']?: string;
    ['Lampiran']?: string;
    attachmentLength?: optionType;
    toGroup?: {
      label: string;
      value: number;
      headPosition: string;
      company: string;
      status: number;
    }[];
    addressedTo?: string;
  };
  formik?: FormikProps<ITemplate>;
}

export enum GreetingsEnum {
  Assignment = 'Assignment',
  Greetings = 'Greetings',
  OfficialMemo = 'OfficialMemo',
  DownPayment = 'DownPayment',
  OfficialTravel = 'OfficialTravel',
  PurchaseOrder = 'PurchaseOrder',
  GoodsRequirements = 'GoodsRequirements',
  Invitation = 'Invitation',
  Default = 'Default'
}
