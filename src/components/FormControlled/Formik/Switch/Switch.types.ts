import { InputHTMLAttributes } from 'react';

export interface SwitchProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: any;
  errmsg?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  size?: 'small' | 'medium';
  name?: string;
  id?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  htmlattributes?: InputHTMLAttributes<object>; // set htmlAttributes see more on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes;
  type?: React.InputHTMLAttributes<unknown>['type'];
  InputProps?: any;
  inputProps?: any;
}
