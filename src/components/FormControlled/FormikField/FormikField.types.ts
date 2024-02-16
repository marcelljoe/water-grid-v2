import { TextFieldProps } from '../Formik/TextField';
import { TinymceEditorProps } from '../Formik/Tinymce/Tinymce.types';
import { AutoCompleteProps } from '../Formik/AutoComplete';
import { PerforationProps } from '../Formik/Perforation';
import { SwitchProps } from '../Formik/Switch';
import { SelectProps } from '../Formik/Select';

export interface FormikFieldProps
  extends Partial<Omit<TextFieldProps, 'onBlur'>>,
    Partial<Omit<TinymceEditorProps, 'onBlur'>>,
    Partial<Omit<AutoCompleteProps, 'onBlur'>>,
    Partial<Omit<PerforationProps, 'onBlur'>>,
    Partial<Omit<SwitchProps, 'onBlur'>>,
    Partial<Omit<SelectProps, 'onBlur'>> {
  name: string;
  fieldType: FormikFieldType;
  styles?: {
    paddingY?: string;
    iconRightMargin?: string;
    hideSelectedIcon?: boolean;
    container?: object;
    //   label?: LabelStyle;
    radio?: object;
  };
  onBlur?: (
    e: // | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    // | React.ChangeEvent<HTMLInputElement>
    // | React.ChangeEvent<HTMLButtonElement>
    any // FIXME: fix type here
  ) => void;
  onChange?: (e: any) => void;
  fieldValidation?: (value: any) => void;
}

export enum FormikFieldType {
  TextField = 'text',
  Select = 'select',
  TextArea = 'textarea',
  Switch = 'switch',
  Editor = 'editor',
  TinyMce = 'Tinymce',
  AutoComplete = 'AutoComplete',
  SelectCustom = 'SelectCustom',
  Perforation = 'perforation'
}
