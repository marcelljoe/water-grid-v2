import { FC, Fragment } from 'react';
import { FormControl, TextField } from '@mui/material';
import { FormikSelectMenu, FormikSelectPlaceholder } from '@/components/FormControlled/Form.styled';
import { SelectProps } from './Select.types';
import { KeyboardArrowDown } from '@mui/icons-material';

const SelectComponent: FC<SelectProps> = props => {
  const { placeholder, options } = props;

  return (
    <Fragment>
      <FormControl className="custom-select" fullWidth>
        <FormikSelectPlaceholder>{props.value ? '' : placeholder}</FormikSelectPlaceholder>
        <TextField
          {...props}
          value={props.value || ''}
          select
          variant="filled"
          FormHelperTextProps={{ sx: { position: 'absolute', top: props.size === 'small' ? '1.75rem' : '2.75rem' } }}
          SelectProps={{
            sx: {
              fontSize: '14px',
              fontFamily: 'inherit',
              minWidth: 240,
              height: 45,
              fontWeight: '500',
              padding: '0px 15px',
              color: '#536580',
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
              },
              '&::placeholder': {
                color: '#A5AEBC'
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
        >
          {options?.map((data, index) => (
            <FormikSelectMenu sx={{ fontSize: 14 }} key={index} value={data.value}>
              {data.label}
            </FormikSelectMenu>
          ))}
        </TextField>
      </FormControl>
    </Fragment>
  );
};

export default SelectComponent;
