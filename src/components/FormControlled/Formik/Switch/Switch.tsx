import { FC, memo, useEffect, useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { SwitchProps } from './Switch.types';
import { styled } from '@mui/material/styles';

const SwitchComponent: FC<SwitchProps> = props => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (props.value?.id) {
      setChecked(true);
    }
  }, [props.value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (props.onChange) {
      if (event.target.id == 'footer') {
        if (event.target.checked) {
          props.onChange({ id: 10, code: 'Footer' });
          return;
        }

        props.onChange({ id: 0, code: '' });
        return;
      }
      if (event.target.id == 'perforation') {
        if (event.target.checked) {
          props.onChange({ id: 8, code: 'Perforation' });
          return;
        }

        props.onChange({ id: 0, code: '' });
        return;
      }
      props.onChange(!checked);
    }
  };

  return (
    <FormControlLabel
      control={<IOSSwitch {...props} checked={checked} onChange={handleChange} />}
      label={props.label}
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        padding: '0px 15px',
        minWidth: 240,
        width: '100%',
        fontSize: 14,
        height: 45,

        border: '1px solid #EFF1F4',
        background: '#F8F9FD',
        borderRadius: '0.75rem',
        '& .MuiTypography-root': { fontSize: '14px', color: '#536580', fontWeight: '500' }
      }}
    />
  );
};

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#01C3FF',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#A5AEBC' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

export default memo(SwitchComponent);
