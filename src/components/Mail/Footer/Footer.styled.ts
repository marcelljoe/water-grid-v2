import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

export const Container = styled(Box)(theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  marginTop: '20px'
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
