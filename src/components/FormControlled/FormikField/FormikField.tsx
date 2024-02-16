import { FormikFieldProps, FormikFieldType } from './FormikField.types';
import { useField } from 'formik';
import React from 'react';
import TextField from '../Formik/TextField';
import AutoCompleteComponent from '../Formik/AutoComplete/AutoComplete';
import Perforation from '../Formik/Perforation';
import TextArea from '../Formik/TextArea';
import Switch from '../Formik/Switch';
import Select from '../Formik/Select';
import SelectCustom from '../Formik/SelectCustom';
import Tinymce from '../Formik/Tinymce';

const FormikField: React.FC<FormikFieldProps> = ({ fieldType, name, fieldValidation, onChange, ...props }) => {
  const [field, meta, helpers] = useField({ name, validate: fieldValidation });
  const { onBlur } = field;
  const { setValue, setTouched } = helpers;

  const handleOnChange = (e: any) => {
    const value =
      fieldType === FormikFieldType.AutoComplete ||
      fieldType === FormikFieldType.Editor ||
      fieldType === FormikFieldType.Perforation ||
      fieldType === FormikFieldType.Switch ||
      fieldType === FormikFieldType.TinyMce
        ? e
        : fieldType === FormikFieldType.SelectCustom
          ? JSON.parse(e.target.value)
          : e.target.value;
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleOnBlur = (e?: any) => {
    if (fieldType === FormikFieldType.TextField) {
      const value = e?.target.value;
      setValue(value?.toString().trim().replace(/  +/g, ' '));
    }
    return onBlur(e);
  };

  let Component;

  switch (fieldType) {
    case FormikFieldType.TextField:
      Component = TextField;
      break;
    case FormikFieldType.TextArea:
      Component = TextArea;
      break;
    case FormikFieldType.AutoComplete:
      Component = AutoCompleteComponent;
      break;
    case FormikFieldType.SelectCustom:
      Component = SelectCustom;
      break;
    case FormikFieldType.Select:
      Component = Select;
      break;
    case FormikFieldType.TinyMce:
      Component = Tinymce;
      break;
    case FormikFieldType.Perforation:
      Component = Perforation;
      break;
    case FormikFieldType.Switch:
      Component = Switch;
      break;
    default:
      Component = TextField;
  }

  const htmlAttributes = {
    ...props.htmlattributes,
    name,
    id: name
  };

  return (
    <Component
      {...props}
      value={field.value}
      onChange={handleOnChange}
      // onEditorChange={onEditorChange}
      // selectedItem={field.value}
      // onSelect={handleOnChange}
      onBlur={handleOnBlur}
      errmsg={meta.touched && meta.error ? meta.error : undefined}
      htmlattributes={htmlAttributes}
    />
  );
};

export default FormikField;
