// import modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

interface PropsSidebar {
  width: number;
}
const drawerWidth = 240;
const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => {
  return !props.includes(prop as string);
};

export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export const ContentSidebar = styled(Drawer, {
  shouldForwardProp: props => shouldForwardProp(['width'], props)
})<PropsSidebar>(({ theme, width }) => ({
  '& .MuiDrawer-paper': {
    // border: 'none !important',
    boxShadow: 'none !important',
    // color: 'transparent !important',
    // background: 'transparent !important',
    boxSizing: 'border-box',
    width: width
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen
    // })
    // ...(width && {
    //   // width: `calc(100% - ${drawerWidth}px)`,
    //   // marginLeft: `${drawerWidth}px`,
    //   transition: theme.transitions.create(['margin', 'width'], {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen
    //   })
    // })
  }
}));

export const ContentMain = styled(Box, {
  shouldForwardProp: props => shouldForwardProp(['width'], props)
})<PropsSidebar>(({ theme, width }) => ({
  background: 'transparent',
  flexGrow: 1,
  padding: '20px 55px 50px'
  // padding: theme.spacing(3),
  // transition: theme.transitions.create('margin', {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen
  // })
  // marginLeft: `-${drawerWidth}px`,
  // ...(width && {
  //   transition: theme.transitions.create('margin', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen
  //   }),
  //   marginLeft: 0
  // })
}));
