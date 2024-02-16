// import modules
import React from 'react';
import Link from 'next/link';

// import material modules
import Collapse from '@mui/material/Collapse';

// import material icons
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// import interfaces
import { PropsList } from '../Sidebar.types';

// import sidebar
import {
  SidebarIcon,
  SidebarIconContainer,
  SidebarList,
  SidebarListButton,
  SidebarListText,
  SidebarListTextActive
} from '../Sidebar.styled';
import IconSelector from '@/components/CustomIcon';
import grey from '@mui/material/colors/grey';
import { blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Avatar, Badge } from '@mui/material';

const NestedListComponent = (props: PropsList) => {
  // desctructuring props
  const {
    menu,
    currRoute,
    count,
    countExternal,
    countExternalInbox,
    countExternalOutgoing,
    countInternalInbox,
    countDisposition,
    countInternalOutgoing
  }: any = props;

  // define state is open collapse
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // define handle is open collapse
  const handleIsOpen = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <React.Fragment>
      <SidebarList disablePadding>
        <SidebarListButton active={false} onClick={handleIsOpen}>
          <SidebarIconContainer className="custom-sidebar-menu" active={false}>
            <SidebarIcon className="custom-sidebar-menu" style={{ marginLeft: '15px' }} active={false}>
              {
                <Badge
                  color="error"
                  variant="dot"
                  invisible={
                    menu.menu == 'Surat Masuk' && (countInternalInbox > 0 || countExternalInbox > 0)
                      ? false
                      : menu.menu == 'Surat Keluar' && (countInternalOutgoing > 0 || countExternalOutgoing > 0)
                        ? false
                        : true
                  }
                >
                  <IconSelector type={menu.icon || ''} />
                </Badge>
              }
            </SidebarIcon>
          </SidebarIconContainer>
          <SidebarListText
            style={{ marginLeft: '40px' }}
            primary={menu.menu}
            primaryTypographyProps={{ fontSize: '0.875rem' }}
          />

          <Box style={{ zIndex: 1000 }}>{isOpen ? <ExpandLess /> : <ExpandMore />}</Box>
        </SidebarListButton>
      </SidebarList>
      {menu?.child &&
        menu.child.map((item: any) => (
          <Collapse key={item.id} in={isOpen} timeout="auto" unmountOnExit>
            <SidebarList disablePadding>
              <Link href={item.path}>
                <SidebarListButton className="custom-sidebar-menu" active={item.path === currRoute} sub>
                  <SidebarListTextActive active={item.path === currRoute}>
                    {/* <FiberManualRecordIcon className="sub-dot" fontSize="small" /> */}
                    <SidebarListText primary={item.menu} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                  </SidebarListTextActive>
                  {item.id == 24 && countInternalInbox > 0 ? (
                    <Avatar
                      style={{
                        width: 18,
                        height: 18,
                        backgroundColor: '#FA3A45',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      {countInternalInbox}
                    </Avatar>
                  ) : item.id == 25 && countExternalInbox > 0 ? (
                    <Avatar
                      style={{
                        width: 18,
                        height: 18,
                        backgroundColor: '#FA3A45',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      {countExternalInbox}
                    </Avatar>
                  ) : item.id == 26 && countInternalOutgoing > 0 ? (
                    <Avatar
                      style={{
                        width: 18,
                        height: 18,
                        backgroundColor: '#FA3A45',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      {countInternalOutgoing}
                    </Avatar>
                  ) : item.id == 27 && countExternalOutgoing > 0 ? (
                    <Avatar
                      style={{
                        width: 18,
                        height: 18,
                        backgroundColor: '#FA3A45',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      {countExternalOutgoing}
                    </Avatar>
                  ) : null}
                </SidebarListButton>
              </Link>
            </SidebarList>
          </Collapse>
        ))}
    </React.Fragment>
  );
};

export default NestedListComponent;
