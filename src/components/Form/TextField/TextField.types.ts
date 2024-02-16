import React, { InputHTMLAttributes } from 'react';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  errmsg?: string;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  size?: 'small' | 'medium';
  name?: string;
  id?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: React.InputHTMLAttributes<unknown>['type'];
  InputProps?: any;
  inputProps?: any;
}
