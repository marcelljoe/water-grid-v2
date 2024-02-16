import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const MailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  // minHeight: '1123px',
  minHeight: '1045px',
  minWidth: '794px',
  position: 'relative',
  padding: '2rem',
  maxWidth: '815px',
  border: '1px solid #eee',
  background: '#FFF',
  boxShadow: '0px 0px 30px -15px rgba(0,0,0,0.60) !important',
  '@media print': {
    border: '1px solid white',
    boxShadow: 'none',
    minHeight: '1050px',
    backgroundColor: 'white'
  },
  borderTop: 'none',
  borderBottom: 'none'
}));

export const MailContainer2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',

  padding: '2rem',
  width: '794px',
  border: '1px solid #eee',
  background: '#FFF',
  boxShadow: '0px 0px 30px -15px rgba(0,0,0,0.60) !important'
}));

export const Content = styled('div', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
  drawerWidth: number;
}>(({ theme, open, drawerWidth }) => ({
  // background: 'transparent',
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: `-${drawerWidth + 20}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));
