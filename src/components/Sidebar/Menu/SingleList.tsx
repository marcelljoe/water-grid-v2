// import modules
import React from 'react';
import Link from 'next/link';

// import interfaces
import { PropsList } from '../Sidebar.types';

// import styles
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
import { Avatar, Badge } from '@mui/material';

const SingleListComponent = (props: PropsList) => {
  // Destructuring Props
  const { menu, currRoute, countDisposition } = props;
  return (
    <React.Fragment>
      <SidebarList disablePadding>
        <Link href={menu.path}>
          <SidebarListButton active={menu.path === currRoute}>
            <SidebarIconContainer active={menu.path === currRoute}>
              <SidebarIcon className="custom-sidebar-menu" style={{ marginLeft: '15px' }} active={false}>
                {
                  <Badge
                    color="error"
                    variant="dot"
                    invisible={menu.menu == 'Disposisi' && countDisposition > 0 ? false : true}
                  >
                    <IconSelector type={menu.icon || ''} />
                  </Badge>
                }
              </SidebarIcon>
            </SidebarIconContainer>
            <SidebarListTextActive active={menu.path === currRoute}>
              <SidebarListText
                className="custom-sidebar-menu"
                style={{ marginLeft: '40px' }}
                primary={menu.menu}
                primaryTypographyProps={{ fontSize: '0.875rem' }}
              >
                {' '}
                <Badge color="error" variant="dot" invisible={true}>
                  <IconSelector type={menu.icon || ''} />
                </Badge>
              </SidebarListText>
            </SidebarListTextActive>
            {menu.menu == 'Disposisi' && countDisposition > 0 && (
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
                {countDisposition}
              </Avatar>
            )}
          </SidebarListButton>
        </Link>
      </SidebarList>
    </React.Fragment>
  );
};

export default SingleListComponent;
