import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from './TextField.types';

const StyleTextField: React.FC<TextFieldProps> = props => {
  const { type, label, placeholder, disabled, value, errmsg, rows, htmlAttributes } = props;
  const { onBlur, onChange, onClick, name, id } = props;

  const styleTextProps = {
    type,
    label,
    placeholder,
    fullWidth: true,
    disabled,
    error: !!errmsg,
    value: value || '',
    FormHelperTextProps: { component: 'div' },
    helperText: !!errmsg && errmsg,
    onBlur,
    onChange,
    onClick,
    inputProps: {
      ...htmlAttributes,
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
    }, // set html attributes
    // inputProps: { ...htmlattributes, style: inputStyle, mask }, // set html attributes
    // InputProps, // set adornment and mask
    name,
    id,
    // InputLabelProps,
    // rowsMax,
    rows,
    multiline: !!rows
  };

  const handleWheel = (e: any) => {
    if (type === 'number') {
      e.target.blur();
    }
  };

  return (
    <TextField
      {...styleTextProps}
      variant="filled"
      FormHelperTextProps={{ sx: { position: 'absolute', top: props.size === 'small' ? '35px' : '55px' } }}
      onWheel={handleWheel}
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
