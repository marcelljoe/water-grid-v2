export interface HeaderComponentProps {
  code: HeaderEnum;
  values?: {
    Judul?: string;
    ['Nomor Surat']?: string;
    docNo?: string;
    letterDate?: string;
  };
}

export enum HeaderEnum {
  HeaderImage = 'HeaderImage',
  HeaderTitle = 'HeaderTitle',
  HeaderNumber = 'HeaderNumber',
  HeaderTravel = 'HeaderTravel',
  HeaderImageOnly = 'HeaderImageOnly',
  HeaderTitleAndDocNo = 'HeaderTitleAndDocNo',
  Default = 'Default'
}
