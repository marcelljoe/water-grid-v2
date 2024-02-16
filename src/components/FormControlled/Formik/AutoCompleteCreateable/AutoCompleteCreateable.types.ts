import React, { InputHTMLAttributes } from 'react';

export interface AutoCompleteCreateableProps {
  label?: string;
  variant?: 'outlined' | 'standard';
  name?: string;
  value?: optionType['value'];
  inputValue?: optionType['value'];
  options?: optionType[];
  disabled?: boolean;
  errmsg?: string;
  onChange?: (value: any) => void;
  mailtypeid?: number;
  // onBlur?: (e: any) => void;
  htmlattributes?: InputHTMLAttributes<object>;
  styles?: propStyles;
  displayValue?: string;
  labelStyle?: any;
  selectedValue?: optionType['value'];
  error?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  size?: 'small' | 'medium';
  multiple?: boolean;
  group?: { name: string; value: any };
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
