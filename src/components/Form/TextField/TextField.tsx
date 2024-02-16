import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField } from '@mui/material';
import { TextFieldProps } from './TextField.types';

const StyleTextField: React.FC<FieldProps & TextFieldProps> = props => {
  const { error, helperText, field, form } = props;

  const isTouched = getIn(form?.touched, field?.name);
  const errorMessage = getIn(form?.errors, field?.name);

  return (
    <TextField
      {...field}
      {...props}
      error={error ?? Boolean(isTouched && errorMessage)}
      variant="filled"
      helperText={helperText ?? (isTouched && errorMessage)}
      FormHelperTextProps={{ sx: { position: 'absolute', top: props.size === 'small' ? '35px' : '55px' } }}
      inputProps={{
        sx: {
          fontSize: '14px',
          fontFamily: 'inherit',
          minWidth: 240,
          height: 45,
          fontWeight: '500',
          padding: '0px 15px',
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
        ...props.InputProps,
        sx: {
          background: '#F8F9FD',
          borderRadius: '8px',
          border: '1px solid #EFF1F4',

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

export default StyleTextField;
