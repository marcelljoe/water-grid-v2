export interface PropsProfileForm {
  openPassword: boolean;
  handleShowPass: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  dirty?: boolean;
  values?: ProfileInitialValue;
  value?: any;
  userLogin?: userLoginValue;
  access?: any;
  openModal?: any;
}

export interface PropsChangePasswordForm {
  id: number | undefined;
  handleDialog: (item: boolean) => void;
}

export interface userLoginValue {
  id?: number;
  name: string;
  nip: number;
  position: string;
  section: string;
}

export interface ProfileInitialValue {
  id?: string;
  oldPassword?: string;
  oldUsername?: string;
  username?: string;
  password?: string;
}

export interface ProfileProps {
  profile?: string;
  userLogin?: userLoginValue;
}
