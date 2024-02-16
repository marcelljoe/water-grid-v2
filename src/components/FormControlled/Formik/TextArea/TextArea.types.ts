import React, { InputHTMLAttributes } from 'react';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: any;
  errmsg?: string;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  size?: 'small' | 'medium';
  name?: string;
  id?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  htmlattributes?: InputHTMLAttributes<object>; // set htmlAttributes see more on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes;
  type?: React.InputHTMLAttributes<unknown>['type'];
  InputProps?: any;
  inputProps?: any;
  rows?: number;
}
