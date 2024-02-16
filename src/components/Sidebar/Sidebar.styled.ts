// import material modules
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface PropsActive {
  active: boolean;
  sub?: boolean;
}

const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => {
  return !props.includes(prop as string);
};

export const SidebarHeader = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%'
  // padding: '20px 0 '
}));

export const SidebarListContainer = styled(Box)(({ theme }) => ({
  marginTop: '5px'
}));

export const SidebarList = styled(ListItem)(({ theme }) => ({
  display: 'block',
  color: 'red'
  // padding: '0 20px'
}));

export const SidebarListText = styled(ListItemText)(({ theme }) => ({
  display: 'block',
  color: 'inherit',
  zIndex: 1000,
  marginLeft: '40px'
  // color: 'red'
}));

// export const SidebarListText = styled(ListItemText, {
//   shouldForwardProp: props => shouldForwardProp(['active'], props)
// })<PropsActive>(({ theme, active, sub }) => ({
//   color: active ? 'none' : 'blue',
//   paddingLeft: '25px',
//   // borderRadius: '10px',
//   width: '100%'
// }));

export const SidebarListTextActive = styled(ListItemText, {
  shouldForwardProp: props => shouldForwardProp(['active', 'sub'], props)
})<PropsActive>(({ theme, active, sub }) => ({
  color: active ? '#1E90FF' : ' #555'
}));

export const SidebarListButton = styled(ListItemButton, {
  shouldForwardProp: props => shouldForwardProp(['active', 'sub'], props)
})<PropsActive>(({ theme, active, sub }) => ({
  color: '#555',
  paddingLeft: '25px',
  // borderRadius: '10px',
  width: '100%',
  ':hover': {
    // background: active && !sub ? '#F7F7F7' : '#00000014'
    background: active && !sub ? 'none' : 'none transparent !important'
  },
  '::before': sub
    ? {
        content: '""',
        display: 'block',
        position: 'absolute',
        height: active ? '100%' : '100%',
        width: active ? '100%' : '100%',
        backgroundColor: active ? '#555' : '',
        // background: active
        //   ? 'linear-gradient(90deg,rgba(0,193,255,.25),rgba(0,193,255,0))!important'
        //   : 'transparent !important',
        background: active
          ? ' linear-gradient( 90deg, rgba(0, 193, 255, 0.25) 0%, rgba(0, 193, 255, 0) 90% ) !important'
          : 'transparent !important',
        // background: active ? 'linear-gradient(90deg,rgba(0,193,255,.25),rgba(0,193,255,0))!important' : '#F7F7F7',
        // background: active ? 'linear-gradient(to right, #a3eeff 0%, #3a7bd5 51%, #00d2ff 100%)' : '#F7F7F7',
        marginRight: active ? '34px' : '37px',
        marginLeft: '-25px'
      }
    : 'none'
}));

export const SidebarIconContainer = styled(ListItemIcon, {
  shouldForwardProp: props => shouldForwardProp(['active'], props)
})<PropsActive>(({ theme, active }) => ({
  // color: active ? 'grey' : 'inherit',
  // background: active
  //   ? 'linear-gradient(90deg,rgba(0,193,255,.25),rgba(0,193,255,0))!important'
  //   : 'transparent !important',
  background: active
    ? ' linear-gradient( 90deg, rgba(0, 193, 255, 0.25) 0%, rgba(0, 193, 255, 0) 90% ) !important'
    : 'transparent !important',

  width: '100%',
  position: 'absolute',
  padding: '5px',
  marginLeft: '-25px',
  borderLeft: 12
}));

export const SidebarIcon = styled(Box, {
  shouldForwardProp: props => shouldForwardProp(['active'], props)
})<PropsActive>(({ theme, active }) => ({
  // background: 'transparent',
  // width: '100%',
  // marginTop: '-23px',
  color: active ? '#1E90FF' : ' #555',
  // background: active ? theme.palette.background.default : theme.palette.background.paper,
  // borderRadius: '10px',
  borderLeft: '20px',
  // boxShadow: '0 5px 15px #0003',
  padding: '6px 6px 0 6px'
  // paddingTop: '10px',
  // padding: '10px',
  // marginLeft: '-25px',
  // position: 'absolute'
  // width: '100%'
}));
