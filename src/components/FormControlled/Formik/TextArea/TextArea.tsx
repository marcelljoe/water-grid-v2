import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from './TextArea.types';

const StyleTextArea: React.FC<TextFieldProps> = props => {
  const { type, label, placeholder, disabled, value, errmsg, rows } = props;
  const { onBlur, onChange, onClick, name, id } = props;
  // const { error, helperText, field, form } = props;

  // const isTouched = getIn(form?.touched, field?.name);
  // const errorMessage = getIn(form?.errors, field?.name);
  const styleTextProps = {
    type,
    label,
    placeholder,
    // variant: 'outlined' as const,
    fullWidth: true,
    disabled,
    error: !!errmsg,
    value: value || '',
    // helperText: !!errMsg && <ErrorMessage message={errMsg} />,
    helperText: !!errmsg && errmsg,
    FormHelperTextProps: { component: 'div' },
    onBlur,
    onChange,
    onClick,
    // inputProps: { ...htmlAttributes, style: inputStyle, mask }, // set html attributes
    // InputProps, // set adornment and mask
    name,
    id,
    // InputLabelProps,
    // rowsMax,
    rows,
    multiline: !!rows
  };

  return (
    <TextField
      {...styleTextProps}
      // {...field}
      // {...props}
      // error={error ?? Boolean(isTouched && errorMessage)}
      variant="filled"
      // rows={rows}
      // helperText={helperText ?? (isTouched && errorMessage)}
      FormHelperTextProps={{ sx: { position: 'absolute', top: props.size === 'small' ? '35px' : '55px' } }}
      inputProps={{
        sx: {
          fontSize: '0.75rem',
          fontFamily: 'inherit',
          fontWeight: '500',
          color: '#536580',
          '&::placeholder': {
            color: '#536580'
          },

          '&[type=number]': {
            MozAppearance: 'textfield'
          },

          '&::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          '&::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          '&::-webkit-datetime-edit': {
            marginTop: '-5px'
          }
        }
      }}
      InputProps={{
        sx: {
          background: '#F8F9FD',
          borderRadius: '0.75rem',
          '&.MuiOutlinedInput-root': {
            paddingRight: '0',
            '& fieldset': {
              border: '1px solid #EFF1F4'
            },
            '&:hover fieldset': {
              border: '1px solid #536580'
            },
            '&.Mui-focused fieldset': {
              border: '1px solid #01C3FF'
            }
          }
        }
      }}
    />
  );
};

export default StyleTextArea;
