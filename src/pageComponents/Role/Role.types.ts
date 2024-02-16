export interface RoleInitialValue {
  description: string;
  status: string | number;
  menu: {
    child: any[];
    header: number;
    id: string;
    level: number;
    menu: string;
    path: string;
    sort: string;
    status: number;
  };
}

export interface PropsRoleForm {
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  data: any;
  columns: readonly Column[];
  values: RoleInitialValue;
  menuUpdated: any;
}

type Column = {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
};
