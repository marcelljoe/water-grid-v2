export interface LoginInitialValue {
  username: string;
  password: string;
}

export interface PropsLoginForm {
  openPassword: boolean;
  handleShowPass: () => void;
  handleForgot: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
}
