export interface MenuInitialValue {
  id?: string | undefined;
  menu: string;
  oldMenu: string;
  path: string;
  sort: string;
  status: number | string;
  header?: number | null;
}

export interface PropsMenuForm {
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  values: MenuInitialValue;
}
