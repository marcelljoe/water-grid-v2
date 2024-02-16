// export interface TinymceEditorProps {
//   id?: string;
//   value?: any;
//   onChange?: (content: string, editor: any) => void; // Define your own type
// }

import React, { InputHTMLAttributes } from 'react';

export interface TinymceEditorProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: any;
  errmsg?: string;
  // onEditorChange?: (content: string, editor: any) => void; // Define your own type
  onChange?: (e: any) => void; // Define your own type
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
}
