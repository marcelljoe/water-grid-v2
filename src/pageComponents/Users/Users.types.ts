export interface UsersInitialValue {
  id?: string;
  name: string;
  role: string;
  oldUsername: any;
  username: string;
  password: string;
}

export interface PropsUsersForm {
  openPassword: boolean;
  handleShowPass: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
  values: UsersInitialValue;
  access?: any;
  openModal?: any;
}
