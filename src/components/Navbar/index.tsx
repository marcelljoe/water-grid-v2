import React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  NavbarContainer,
  NavbarIconContainer,
  NavbarContentContainer,
  NavbarContentProfileContainer,
  NavbarContentProfileButton,
  NavbarMenuContainer,
  NavbarMenuContentContainer,
  NavbarMenuTextContainer,
  NavbarMenuText,
  NavbarMenuSubText,
  NavbarMenuTooltipContainer,
  NavbarMenuIconButton,
  NavbarToolbar
} from './Navbar.styled';
import { ISessionProfile } from '@/lib/services';
import { Drawer, Toolbar } from '@mui/material';

export interface PropsNavbar {
  window?: () => Window;
  drawerWidth: number;
  handleDrawerToggle(): true;
  userSession: ISessionProfile | null;
  //   session: SessionData;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  background: 'transparent !important',
  boxShadow: 'none',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const NavbarComponent = (props: any) => {
  const router = useRouter();
  const { window, drawerWidth, handleDrawerToggle } = props;
  const [openMenu, setOpenMenu] = React.useState<null | HTMLElement>(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window() : undefined
  });

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClickCloseMenu = () => {
    setOpenMenu(null);
  };

  // define logout path
  const handleClickLogout = () => {
    router.push('/api/auth/logout');
  };

  const [open, setOpen] = React.useState(false);

  return (
    <NavbarContainer className="mobileview" position="fixed" width={drawerWidth} trigger={trigger}>
      <NavbarToolbar>
        <NavbarContentContainer>
          <AppBar open={open}>
            <Toolbar>
              <NavbarIconContainer
                color="inherit"
                className="logo-button"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                style={{ color: 'black' }}
                // onClick={handleDrawerOpen}
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </NavbarIconContainer>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box'
              }
            }}
            variant="persistent"
            anchor="left"
            open={open}
          ></Drawer>

          <NavbarContentProfileContainer>
            <Box className="user"> {props.userSession?.name}</Box>
            <Box className="role">{props.userSession?.role}</Box>
            <NavbarContentProfileButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              disableRipple
              onClick={handleClickMenu}
              style={{ zIndex: 1000 }}
              sx={{ marginRight: '-20px !important' }}
            >
              <AccountCircleIcon />
            </NavbarContentProfileButton>
            <Menu
              anchorEl={openMenu}
              open={Boolean(openMenu)}
              onClose={handleClickCloseMenu}
              disableScrollLock={true}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: '10px',
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                  }
                }
              }}
              MenuListProps={{ disablePadding: true, sx: { width: '240px' } }}
            >
              <NavbarMenuContainer>
                <NavbarMenuContentContainer>
                  <NavbarMenuTextContainer>
                    <NavbarMenuText>{props.userSession?.name}</NavbarMenuText>
                    <NavbarMenuSubText>{props.userSession?.role}</NavbarMenuSubText> {/* replace data with role */}
                  </NavbarMenuTextContainer>
                </NavbarMenuContentContainer>
                <NavbarMenuTooltipContainer title="Logout">
                  <NavbarMenuIconButton onClick={handleClickLogout}>
                    <LogoutIcon />
                  </NavbarMenuIconButton>
                </NavbarMenuTooltipContainer>
              </NavbarMenuContainer>
            </Menu>
          </NavbarContentProfileContainer>
        </NavbarContentContainer>
      </NavbarToolbar>
    </NavbarContainer>
  );
};

export default React.memo(NavbarComponent);
