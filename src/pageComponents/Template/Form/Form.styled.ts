// import modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const FormCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
  padding: '1.875rem',
  paddingBottom: '0',
  flexDirection: 'column',
  gap: '0.8rem'
}));

export const FormCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%'
}));

export const FormCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  flexDirection: 'column',
  gap: '0.5rem'
}));

export const FormCardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  margin: '1rem 0 1.1rem 0',
  width: '100%',
  flexDirection: 'column',
  gap: '0.5rem'
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: theme.typography.h6.fontWeight,
  textAlign: 'left'
}));

export const ContentTitle = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 500,
  color: '#A5AEBC',
  marginTop: 15,
  alignSelf: 'start'
}));

export const ContentLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 400,
  textAlign: 'left',
  marginBottom: '0.2rem'
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 400,
  textAlign: 'left',
  marginBottom: '0.2rem'
}));
