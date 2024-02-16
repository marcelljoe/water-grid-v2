import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex-end ',
  textAlign: 'center',
  // justifyContent: 'flex-end', // Use 'flex-end' to justify content to the right
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  fonstStyle: 'Tahoma'
  // marginLeft:'1cm'
}));

export const ContainerLeft = styled(Box)(({ theme }) => ({
  fontStyle: 'Tahoma',
  display: 'flex-start ',
  textAlign: 'center',
  // justifyContent: 'flex-end', // Use 'flex-end' to justify content to the right
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  fontWeight: '600',
  marginTop: '30px'
}));
