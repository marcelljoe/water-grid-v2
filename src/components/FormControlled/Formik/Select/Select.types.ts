import React, { InputHTMLAttributes } from 'react';

export interface SelectProps {
  label?: string;
  variant?: 'outlined' | 'standard';
  name?: string;
  value?: optionType['value'];
  options?: optionType[];
  disabled?: boolean;
  errmsg?: string;
  onChange?: (value: any) => void;
  onBlur?: (e: any) => void;
  htmlAttributes?: InputHTMLAttributes<object>;
  styles?: propStyles;
  displayValue?: string;
  labelStyle?: any;
  selectedValue?: optionType['value'];
  error?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  size?: 'small' | 'medium';
}

interface propStyles {
  paddingY?: string;
  iconRightMargin?: string;
  hideSelectedIcon?: boolean;
}

export type optionType = {
  label: string;
  value: any;
};
