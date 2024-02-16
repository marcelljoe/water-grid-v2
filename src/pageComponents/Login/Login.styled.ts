// import modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const LoginSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const LoginBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '22rem',
  border: 'none',
  background: '#FFF',
  borderRadius: '0.625rem',
  boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 5px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
  position: 'relative',
  marginTop: '-1rem'
}));

export const LoginCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
  padding: '1.875rem',
  flexDirection: 'column',
  gap: '0.5rem',
  boxShadow: '10px 10px 20px rgb(0 0 0/10%)'
}));

export const LoginCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%'
}));

export const LoginCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'column',
  gap: '0.8rem'
}));

export const LoginCardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  margin: '1rem 0 1.1rem 0',
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
  gap: '10px'
}));

export const LoginHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  textAlign: 'center'
}));

export const LoginHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  textAlign: 'center',
  fontWeight: 600,
  color: '#bbb'
}));

export const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'row',
  gap: '1rem'
}));

export const LoginRedirect = styled(Link)(({ theme }) => ({
  alignSelf: 'end',
  // marginTop: '0.8rem',
  color: 'inherit',
  textDecoration: 'none',
  fontSize: '0.8rem',
  fontWeight: theme.typography.fontWeightLight,
  cursor: 'pointer',
  ':hover': {
    color: '#0081EA'
  }
}));
