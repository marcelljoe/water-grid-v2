export interface FooterComponentProps {
  code: FooterEnum;
  values?: {};
}

// type FlexibleArray<T> = T[];

export enum FooterEnum {
  Footer = 'Footer',
  Default = 'Default'
}
