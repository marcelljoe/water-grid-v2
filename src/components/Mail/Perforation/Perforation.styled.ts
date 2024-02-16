import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

export const Container = styled(Box)(theme => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'left',
  flexDirection: 'column',
  width: '100%',
  marginLeft: '1cm'
  // marginTop:'20vh'
}));

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  lineHeight: 1.5,
  textAlign: 'left',
  marginLeft: '10px',
  fontSize: '0.7rem',
  border: 'none',
  boxShadow: 'none'

  // color: theme.palette.text.secondary
}));

export const boxStyle = {
  height: '100px', // Set the desired height here
  backgroundColor: 'primary.main', // Optional background color
  color: 'white', // Optional text color
  padding: '16px', // Optional padding
  border: 1
};
