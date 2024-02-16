import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '0.25rem',
  fontFamily: 'Tahoma',
  fontSize: '0.8rem',
  marginTop: '-20px',
  marginLeft: '1.5cm',
  flexGrow: 1
  // minWidth:'720px'
  // minWidth:'80vh'
}));

export const Item = styled(Paper)(({ theme }) => ({
  // marginLeft: '3cm',
  lineHeight: '1.1',
  textAlign: 'left',
  fontFamily: 'Tahoma',
  fontSize: '0.8rem',
  // margin: '-1.5px',
  border: 'none', // Remove border
  boxShadow: 'none', // Remove box shadow
  background: 'transparent'
}));

export const Item2 = styled(Paper)(({ theme }) => ({
  textAlign: 'justify',
  fontFamily: 'Tahoma',
  fontStyle: 'Tahoma',
  fontSize: '0.75rem',
  background: 'transparent',
  // margin: '-4.5px',
  lineHeight: '1.1',
  border: 'none', // Remove border
  boxShadow: 'none'
}));
