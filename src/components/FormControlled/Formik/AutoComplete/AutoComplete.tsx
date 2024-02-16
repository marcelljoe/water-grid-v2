import { Autocomplete, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { AutoCompleteProps, optionType } from './AutoComplete.types';
import { http } from '@/utils/httpClient';

const AutoCompleteComponent: FC<AutoCompleteProps> = ({ ...props }) => {
  const { errmsg } = props;
  const [option, setOption] = useState<optionType[]>([]);
  const { onChange } = props;

  useEffect(() => {
    if (props.options) {
      setOption(props.options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.options]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getOption() {
      try {
        let query: string = '';

        query += props.group ? `${props.group.name}=${props.group.value.value}` : '';
        if (props.mailtype) {
          query = query + `mailType=${props.mailtype}&mailTypeId=${props.mailtypeid}`;
        }

        const optionData = await http.get(`/api/master/${props.optiontype}?${query}`, {
          signal: abortController.signal
        });

        if (optionData.data) {
          setOption(optionData.data);
        }
      } catch (error) {}
    }

    if (props.optiontype) {
      getOption();
    }

    return () => {
      abortController.abort();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.optiontype, props.group, props.mailtypeid]);

  const handleOnChange = (event: any, value: any) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Autocomplete
      {...props}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={handleOnChange}
      multiple={props.multiple}
      options={option}
      className="custom-autocomplete"
      getOptionLabel={option => option?.label || ''}
      value={props.multiple ? props.selectedValue || props.value || [] : props.selectedValue || props.value || null}
      renderInput={params => (
        <TextField
          placeholder={props.placeholder}
          variant="filled"
          error={!!errmsg}
          helperText={!!errmsg && errmsg}
          FormHelperTextProps={{ component: 'div' }}
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
          {...params}
        />
      )}
    />
  );
};

export default React.memo(AutoCompleteComponent);
