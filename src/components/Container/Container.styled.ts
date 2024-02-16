// import modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  minHeight: '100vh'
}));

export const AuthPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  minHeight: '100vh',
  backgroundSize: 'cover',
  textAlign: 'center',
  background: 'linear-gradient(60deg, rgb(0 51 153) 0%, rgb(0 204 255) 100%)'
}));

export const AuthPageBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0vh',
  width: '100%'
}));
