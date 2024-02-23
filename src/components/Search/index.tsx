import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  //   backgroundColor: '#F0F1F4',
  color: 'black',
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%'
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(1),
  //     width: 'auto',
  //   },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontSize: 'small',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));
