// import modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const ForgotBox = styled(Box)(({ theme }) => ({
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

export const ForgotCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
  padding: '2rem',
  flexDirection: 'column',
  gap: '1rem'
}));

export const ForgotCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%'
}));

export const ForgotCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'column',
  gap: '0.8rem'
}));

export const ForgotCardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  marginTop: '1rem',
  width: '100%',
  flexDirection: 'column',
  gap: '0.8rem'
}));

export const FormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'column'
}));

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'column',
  gap: '1.8rem'
}));

export const ForgotHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: theme.typography.h2.fontWeight,
  textAlign: 'center'
}));

export const ForgotHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: 'inherit',
  textAlign: 'center'
}));

export const ForgotLoginRedirect = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  color: 'inherit',
  textDecoration: 'none',
  fontSize: '0.8rem',
  fontWeight: theme.typography.fontWeightLight,
  cursor: 'pointer'
}));
