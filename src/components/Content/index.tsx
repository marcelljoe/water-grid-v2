import React, { useContext, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';
import SidebarComponent from '@/components/Sidebar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { ContentContainer } from './Content.styled';
import { http } from '@/utils/httpClient';
import { ISessionProfile } from '@/lib/services';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import ChangePasswordForm from '@/pageComponents/Profile/FormChangePassword';
import { StoreContext } from '@/context/context';
interface PropsContent {
  window?: () => Window;
  children: React.ReactElement;
}

export interface MenuData {
  menu: MenuList;
  subMenu: MenuList[] | [];
}

interface MenuList {
  id: number;
  name: string;
  path: string;
  icon: string;
}

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  marginTop: '-15px',
  // background: 'transparent',
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const NavbarIconContainer = styled(IconButton)(({ theme }) => ({
  color: 'inherit'
}));

const ContentComponent = (props: PropsContent) => {
  const { state, actions } = useContext(StoreContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const openMenus = Boolean(anchorEl);
  const handleClickMenus = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenus = () => {
    setAnchorEl(null);
  };

  const [dialog, setDialog] = React.useState(false);
  const [dialogPassword, setDialogPassword] = React.useState(false);

  const router = useRouter();

  const handleOpenDialogPassword = (item: boolean) => {
    setDialogPassword(item);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const { children } = props;

  // define open mobile state
  const [userSession, setUserSession] = React.useState<ISessionProfile | null>(null);
  const [userSessionDetail, setUserSessionDetail] = React.useState<any>(null);
  const [countUnreadInbox, setCountUnreadInbox] = React.useState<number>(0);
  const [countUnreadDisposition, setCountUnreadDisposition] = React.useState<number>(0);
  const [countUnreadExternalInbox, setCountUnreadExternalInbox] = React.useState<number>(0);
  const [countUnreadInternalInbox, setCountUnreadInternalInbox] = React.useState<number>(0);
  const [countUnreadExternalOutgoing, setCountUnreadExternalOutgoing] = React.useState<number>(0);
  const [countUnreadInternalOutgoing, setCountUnreadInternalOutgoing] = React.useState<number>(0);
  const handleClickDrawerToggleNav = () => {
    setOpen(!open);
    actions.UPDATE_NAVBAR({ show: open });
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await http.get('/api/session/profile');
      console.log(response.data.menu);
      if (response.status === 200) {
        setUserSession(response.data);
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getProfile();

    const getProfileDetail = async () => {
      const response = await http.get('/api/session/profile-detail');
      if (response.status === 200) {
        setUserSessionDetail(response.data);
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getProfileDetail();

    const getCount = async () => {
      const response = await http.get('/api/mail/countunread');
      if (response.status === 200) {
        setCountUnreadInbox(response.data);
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getCount();

    const getCountDispositionUnread = async () => {
      const response = await http.get('/api/mail/unreadDisposition');
      if (response.status === 200) {
        setCountUnreadDisposition(parseInt(response.data));
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getCountDispositionUnread();

    const getCountInternalIncoming = async () => {
      const response = await http.get('/api/mail/getCountInternalIncoming');
      if (response.status === 200) {
        setCountUnreadInternalInbox(parseInt(response.data));
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getCountInternalIncoming();

    const getCountExternalIncoming = async () => {
      const response = await http.get('/api/mail/getCountExternalIncoming');
      if (response.status === 200) {
        setCountUnreadExternalInbox(parseInt(response.data));
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getCountExternalIncoming();

    const getCountInternalOutgoing = async () => {
      const response = await http.get('/api/mail/getCountInternalOutgoing');
      if (response.status === 200) {
        setCountUnreadInternalOutgoing(parseInt(response.data));
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getCountInternalOutgoing();

    const getCountExternalOutgoing = async () => {
      const response = await http.get('/api/mail/getCountExternalOutgoing');
      if (response.status === 200) {
        setCountUnreadExternalOutgoing(parseInt(response.data));
      }

      if (response.status !== 200) {
        return alert('Something Went Wrong');
      }
    };

    getCountExternalOutgoing();
  }, []);

  const handleClickLogout = () => {
    router.push('/api/auth/logout');
  };

  return (
    <ContentContainer>
      {/* <NavbarComponent
        userSession={userSession}
        window={window}
        openDrawer={open}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleClickDrawerToggle}
        title={''}
      /> */}

      <AppBar className="navbar-top">
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1}>
            <NavbarIconContainer
              className="icon-menu"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleClickDrawerToggleNav}
              style={{ color: 'black' }}
            >
              {/* <Box>
                  <Image src={'/images/logo.png'} alt="Logo Image" height={45} width={80} />
                </Box> */}
              <MenuIcon />
            </NavbarIconContainer>
            <img
              className="icon-image"
              src={'/images/logo.png'}
              alt="Logo Image"
              style={{ height: 30, marginRight: 5 }}
            />

            <h6 className="font-header">
              <strong>WEB SERVICES</strong> Tirta Benteng
            </h6>
          </Stack>
          <Stack
            className="mobile-logout"
            direction="row"
            spacing={2}
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClickMenus}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openMenus ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenus ? 'true' : undefined}
              >
                <PersonOutlineOutlinedIcon className="icon-user" style={{ color: 'black' }} />
                <h6 className="menu-user">
                  {userSession?.role} | <strong style={{ textTransform: 'uppercase' }}>{userSession?.name}</strong>
                </h6>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              className="profile-menu"
              open={openMenus}
              onClose={handleCloseMenus}
              onClick={handleCloseMenus}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem sx={{ my: 0.75 }}>
                <Avatar>
                  <PersonOutlinedIcon fontSize="small" />
                </Avatar>
                Profile
              </MenuItem>
              <Divider />

              <List>
                <ListItem>
                  <ListItemText primary="Nama" secondary={userSessionDetail?.name || '-'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Posisi" secondary={userSessionDetail?.position || '-'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="NIP" secondary={userSessionDetail?.nip || '-'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Seksi" secondary={userSessionDetail?.section || '-'} />
                </ListItem>
              </List>
              <Divider />
              <MenuItem sx={{ my: 0.75 }} onClick={() => handleOpenDialogPassword(true)}>
                <Avatar>
                  <LockOutlinedIcon fontSize="small" />
                </Avatar>
                Ubah Password
              </MenuItem>
              <MenuItem sx={{ my: 0.75 }} onClick={handleClickOpen}>
                <Avatar>
                  <Logout fontSize="small" />
                </Avatar>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Ubah</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: 12, color: 'black' }}>
            Apakah anda yakin ingin keluar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Tidak</Button>
          <Button onClick={handleClickLogout} autoFocus>
            Iya
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogPassword}
        onClose={() => handleOpenDialogPassword(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Ubah Kata Sandi Akun</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: 12, color: 'black' }}>
            <ChangePasswordForm id={userSession?.id} handleDialog={handleOpenDialogPassword} />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Drawer
        sx={{
          width: drawerWidth,
          borderRight: 'none',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: '#ffffff',
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        className="sidebar-left"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="sidebar-header" />
        <SidebarComponent
          menu={userSession ? userSession.menu : []}
          count={countUnreadInbox}
          countExternal={countUnreadExternalInbox}
          countDisposition={countUnreadDisposition}
          countInternalInbox={countUnreadInternalInbox}
          countExternalInbox={countUnreadExternalInbox}
          countInternalOutgoing={countUnreadInternalOutgoing}
          countExternalOutgoing={countUnreadExternalOutgoing}
        />
        {/* <SidebarComponent menu={userSession ? userSession.menu : []} count={0} ></SidebarComponent> */}
        <Box className="mobile-view-logout">
          <Stack direction="column" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonOutlineOutlinedIcon className="icon-user" style={{ color: 'black', marginRight: '9px' }} />
              <h6 className="name-color">
                {userSession?.role} | <strong style={{ textTransform: 'uppercase' }}>{userSession?.name}</strong>
              </h6>
            </Stack>
            <Button
              sx={{ marginTop: '13px', marginLeft: '3px' }}
              color="secondary"
              style={{ color: 'black' }}
              onClick={handleClickOpen}
              startIcon={<ExitToAppOutlinedIcon />}
            >
              <h6 className="menu-logout" style={{ marginLeft: '11px' }}>
                <strong>Log out</strong>
              </h6>
            </Button>
          </Stack>
        </Box>
        {/* <ContentSidebar
          container={window && window().document.body}
          variant="temporary"
          className='test-sidebar'
          open={open}
          ModalProps={{ keepMounted: true }}
          width={drawerWidth}
        >
          <IconButton className="logo-hiden" onClick={handleClickDrawerToggle}>
            <Image src={'/images/logo.png'} alt="Logo Image" height={40} width={40} />
            <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </IconButton>
        </ContentSidebar>
        */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <NavbarContentBreadcumbsContainer aria-label="breadcrumb" className="breadcrumb">
          <NavbarContentBreadcumbsLink href="/dashboard">
            <HomeIcon style={{ fontSize: '15px' }} />
          </NavbarContentBreadcumbsLink>
          {getNav.map((data, index) => (
            <Box key={index} fontStyle={{ fontSize: '10px', padding: '10px 0px 10px' }}>
              {index === 1 && getNav.length > 2 ? (
                <NavbarContentBreadcumbsLink href={`/${getNav[0]}/${data}`}>
                  <NavbarContentBreadcumbsText>{validateUpperCase(data)}</NavbarContentBreadcumbsText>
                </NavbarContentBreadcumbsLink>
              ) : (
                <NavbarContentBreadcumbsText>{validateUpperCase(data)}</NavbarContentBreadcumbsText>
              )}
            </Box>
          ))}
        </NavbarContentBreadcumbsContainer> */}
        <div className="content-p">{children}</div>
      </Main>
    </ContentContainer>
  );
};

// export content component
export default React.memo(ContentComponent);
