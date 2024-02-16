// import modules
import Link from 'next/link';

// import material modules
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';

interface PropsNavbarContainer {
  width: number;
  trigger: boolean;
}

const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => {
  return !props.includes(prop as string);
};

export const NavbarContainer = styled(AppBar, {
  shouldForwardProp: props => shouldForwardProp(['width', 'trigger'], props)
})<PropsNavbarContainer>(({ theme, width, trigger }) => ({
  color: theme.palette.text.primary,
  background: 'transparent',
  boxShadow: 'none'
}));

export const NavbarToolbar = styled(Toolbar)(({ theme }) => ({
  margin: '0 30px'
}));

export const NavbarIconContainer = styled(IconButton)(({ theme }) => ({
  color: 'inherit'
}));

export const NavbarContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  position: 'relative',
  width: '100%',
  transition: 'background 0.2s ease'
}));

export const NavbarContentBreadcumbsContainer = styled(Breadcrumbs)(({ theme }) => ({
  fontSize: '12px'
}));

export const NavbarContentBreadcumbsLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // fontSize: '100px'
  fontSize: theme.typography.subtitle2.fontSize
}));

export const NavbarContentBreadcumbsText = styled(Typography)(({ theme }) => ({
  // fontSize: theme.typography.subtitle2.fontSize,
  fontSize: '12px',
  color: theme.palette.text.primary
}));

export const NavbarContentProfileContainer = styled(Box)(({ theme }) => ({
  width: 'auto'
}));

export const NavbarContentProfileButton = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  borderRadius: '10px',
  '&:hover': {
    background: '#00000014'
  }
}));

export const NavbarMenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  background: '#FFF',
  padding: '15px'
}));

export const NavbarMenuContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

export const NavbarMenuTextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

export const NavbarMenuText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.subtitle2.fontSize
}));

export const NavbarMenuSubText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary
}));

export const NavbarMenuTooltipContainer = styled(Tooltip)(({ theme }) => ({}));

export const NavbarMenuIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    background: '#00000014'
  }
}));
