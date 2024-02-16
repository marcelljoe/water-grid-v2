export interface BackLetterComponentProps {
  code: BackLetterEnum;
  values?: {
    Nomor: string;
    SPPD: string;
    ['Belakang Surat']?: string;
  };
}

export enum BackLetterEnum {
  BackLetterSPPD = 'BackLetterSPPD',
  Default = 'Default'
}
