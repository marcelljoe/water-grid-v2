export interface ForgotInitialValue {
  email: string;
}

export interface PropsForgotForm {
  handleLogin: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
}

export interface ResetInitialValue {
  password: string;
  confirmPassword: string;
}

export interface PropsResetForm {
  openPassword: boolean;
  openConfirmPassword: boolean;
  handleShowPass: () => void;
  handleShowConfirmPass: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  dirty: boolean;
}
