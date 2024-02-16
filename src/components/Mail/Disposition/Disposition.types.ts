export interface DispositionComponentProps {
  code: DispositionEnum;
  values?: {
    ['Mengetahui & Menyetujui']?: IEmployee;
  };
  mailDisposition: any;
}

interface IEmployee {
  NIP: number;
  department: string;
  label: string;
  name: string;
  position: string;
  section: string;
  value: number;
}

export enum DispositionEnum {
  Disposition1 = 'Disposition1',
  Disposition2 = 'Disposition2',
  Disposition3 = 'Disposition3',
  Default = 'Default'
}
