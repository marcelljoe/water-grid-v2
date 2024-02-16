// import modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const MenuBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '25rem',
  border: 'none',
  background: '#FFF',
  borderRadius: '1rem',
  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 5px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
  position: 'relative'
}));

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'column',
  gap: '1.8rem'
}));

export const MenuCardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  marginTop: '1rem',
  width: '100%',
  flexDirection: 'column',
  gap: '0.8rem'
}));
