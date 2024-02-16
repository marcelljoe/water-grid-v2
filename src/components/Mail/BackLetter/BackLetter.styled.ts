import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

export const Container = styled(Box)(theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%'
}));

export const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  marginLeft: '10px',
  fontSize: '0.9rem'

  // color: theme.palette.text.secondary
}));

export const boxStyle = {
  height: '100px', // Set the desired height here
  backgroundColor: 'primary.main', // Optional background color
  color: 'white', // Optional text color
  padding: '16px', // Optional padding
  border: 1
};

export const cellStyle = {
  border: '1px solid #000', // Add borders to cells
  padding: '8px'
};

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
