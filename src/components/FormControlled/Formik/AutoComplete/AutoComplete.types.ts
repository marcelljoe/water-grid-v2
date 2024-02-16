import React, { InputHTMLAttributes } from 'react';

export interface AutoCompleteProps {
  label?: string;
  variant?: 'outlined' | 'standard';
  name?: string;
  value?: optionType['value'];
  inputValue?: optionType['value'];
  options?: optionType[];
  disabled?: boolean;
  errmsg?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  htmlattributes?: InputHTMLAttributes<object>; // set htmlAttributes see more on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes;
  styles?: propStyles;
  displayValue?: string;
  labelStyle?: any;
  selectedValue?: optionType['value'];
  error?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  size?: 'small' | 'medium';
  multiple?: boolean;
  optiontype?: string;
  group?: { name: string; value: any };
  mailtype?: string;
  mailtypeid?: number;
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
