import React, { FC, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AutoCompleteCreateableProps } from './AutoCompleteCreateable.types';
import { optionType } from '../AutoComplete/AutoComplete.types';
import { Chip } from '@mui/material';

const AutoCompleteCreateable: FC<AutoCompleteCreateableProps> = props => {
  const { onChange, mailtypeid } = props;
  const [values, setValues] = React.useState<optionType[]>([]);
  const [options, setOptions] = React.useState<optionType[]>([]);
  const [resetKey, setResetKey] = React.useState<number>(0);

  useEffect(() => {
    // Reset the Autocomplete component when mailId changes
    setResetKey(prevKey => prevKey + 1);
    setValues([]);
  }, [mailtypeid]);

  useEffect(() => {
    if (props.value) {
      setOptions(props.value);
      setValues(props.value);
    }
  }, []);

  const handleOnChange = (event: any, value: any, reason: string) => {
    if (onChange) {
      if (reason == 'createOption') {
        const newValue = value[value.length - 1];
        setValues(prevState => [
          ...prevState,
          {
            label: newValue,
            value: newValue
          }
        ]);
        onChange([
          ...values,
          {
            label: newValue,
            value: newValue
          }
        ]);

        setOptions(prevState => [
          ...prevState,
          {
            label: newValue,
            value: newValue
          }
        ]);
      }

      if (reason == 'removeOption') {
        setValues(value);
        onChange(value);
      }
    }
  };

  return (
    <Autocomplete
      {...props}
      onChange={handleOnChange}
      multiple
      key={resetKey}
      value={values}
      options={options}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          return (
            <Chip variant="outlined" label={option.label} {...getTagProps({ index })} key={option.label + index} />
          );
        })
      }
      renderInput={params => (
        <TextField
          placeholder={props.placeholder}
          {...params}
          variant="filled"
          className="custom-autocomplete"
          sx={{
            background: '#F8F9FD !important',
            borderRadius: '8px',
            paddingTop: '0 !important',
            height: 'auto',
            border: '1px solid #EFF1F4',
            fontFamily: 'inherit',

            fontSize: '14px',
            fontWeight: '500',
            color: '#536580',
            '&::placeholder': {
              color: '#536580'
            },
            minWidth: 300
          }}
        />
      )}
    />
  );
};

export default AutoCompleteCreateable;
