export interface SignatureComponentProps {
  code: SignatureEnum;
  values?: {
    type: string;
    ['Menyetujui']?: IEmployee;
    ['Tanda Tangan']?: IEmployee;
    ['Dibuat Oleh']?: IEmployee;
    ['Mengetahui & Menyetujui']?: IEmployee;
    letterDate?: string;
    Nomor?: string;
    Perihal?: string;
    diTempat?: string;
  };
  mailSignature: any;
}

interface IEmployee {
  NIP: number;
  department: string;
  label: string;
  name: string;
  position: string;
  section: string;
  value: number;
  position_level?: number;
}

export enum SignatureEnum {
  SignatureAssignment = 'SignatureAssignment',
  Signature = 'Signature',
  DoubleSignature = 'DoubleSignature',
  SignatureDownPayment = 'SignatureDownPayment',
  SignatureTravel = 'SignatureTravel',
  SignatureGoodsRequirements = 'SignatureGoodsRequirements',
  SignaturePurchaseOrder = 'SignaturePurchaseOrder',
  Default = 'Default'
}
