import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper, Table, Typography } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'left',
  flexDirection: 'column',
  width: '100%',
  gap: '0.25rem',
  fontFamily: 'Tahoma',
  marginLeft: '1.5cm',
  paddingRight: '2.4cm',
  fontStyle: 'Tahoma'
}));

export const TypographyContainer = styled(Box)(({ theme }) => ({
  lineHeight: 1.1,
  justifyContent: 'center',
  textAlign: 'justify',
  width: '100%',
  fontSize: '0.8rem',
  fontFamily: 'Tahoma'
  // paddingRight:'2vh'
  // marginBottom: '20px'
}));

export const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: '1rem',
  fontFamily: 'Tahoma',
  border: 'none', // Remove border
  boxShadow: 'none', // Remove box shadow
  margin: '-3px'
  // color: theme.palette.text.secondary
}));
export const ItemDownPayment = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  fontSize: '0.9rem',
  fontFamily: 'Tahoma',
  border: 'none', // Remove border
  boxShadow: 'none' // Remove box shadow

  // color: theme.palette.text.secondary
}));

export const cellStyle = {
  border: '1px solid #000', // Add borders to cells
  padding: '8px'
};

export const cellSpan = {
  border: '1px solid #000',
  padding: '40px'
};

export const cells = styled(Table)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  overflowX: 'auto'
}));

export const Item2 = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  fontFamily: 'Tahoma',
  fontSize: '1rem',
  background: 'transparent'
}));
