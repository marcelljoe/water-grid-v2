// Import material modules
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const ButtonLogin = styled(Button)(({ theme }) => ({
  padding: '0.6rem 2.5rem',
  fontSize: '0.875rem',
  color: '#FFF',
  fontWeight: 500,
  textTransform: 'capitalize',
  background: 'linear-gradient(90deg,#00d2ff 0,#3a7bd5 51%,#00d2ff)',
  backgroundSize: '200% auto',
  transition: '.5s',
  borderRadius: '1.5rem',
  boxShadow: '0 0 20px #eee',
  ':disabled': {
    color: '#FFF'
  },
  ':hover': {
    backgroundPosition: '100%',
    boxShadow: '0 0 20px #eee'
  },
  ':active': {
    boxShadow: '0 0 20px #eee'
  }
}));

export const ButtonPrimary = styled(Button)(({ theme }) => ({
  padding: '0.6rem 2.5rem',
  fontSize: '0.875rem',
  color: '#FFF',
  fontWeight: 500,
  textTransform: 'capitalize',
  ':disabled': {
    pointerEvents: 'unset',
    cursor: 'not-allowed'
  },
  transition: '.5s',
  borderRadius: '1.5rem'
}));

export const ButtonSecondary = styled(Button)(({ theme }) => ({
  padding: '0.6rem 2.5rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'capitalize',
  ':disabled': {
    pointerEvents: 'unset',
    cursor: 'not-allowed'
  },
  transition: '.5s',
  borderRadius: '1.5rem'
}));
