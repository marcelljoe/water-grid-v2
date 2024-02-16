export interface ContentComponentProps {
  code: ContentEnum;
  values?: {
    letterDate?: string;
    Nomor?: string;
    Perihal?: string;
    ['Kata Pengantar']?: string;
    ['Isi Surat']?: string;
  };
}

export enum ContentEnum {
  ContentList = 'ContentList',
  ContentText = 'ContentText',
  ContentDownPayment = 'ContentDownPayment',
  ContentTravel = 'ContentTravel',
  ContentGoods = 'ContentGoods',
  ContentInvitation = 'ContentInvitation',
  ContentBidRequest = 'ContentBidRequest',
  ContentPurchaseOrder = 'ContentPurchaseOrder',
  Default = 'Default'
}
