export interface PerforationComponentProps {
  code: PerforationEnum;
  values?: {
    Tembusan?: {
      label: string;
      value: number;
      headPosition: string;
    }[];
  };
}

// type FlexibleArray<T> = T[];

export enum PerforationEnum {
  Perforation = 'Perforation',
  Default = 'Default'
}
