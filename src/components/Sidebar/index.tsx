// import modules
import React from 'react';
import { useRouter } from 'next/router';
import { NestedList, SingleList } from './Menu';
import { SidebarHeader, SidebarListContainer } from './Sidebar.styled';
import { Menu } from '@/lib/services/session';
import Box from '@mui/material/Box';

interface PropsSidebar {
  menu: Menu[];
  count: number;
  countExternal: number;
  countDisposition: number;
  countInternalInbox: number;
  countExternalInbox: number;
  countInternalOutgoing: number;
  countExternalOutgoing: number;
}

const SidebarComponent = (props: PropsSidebar) => {
  const {
    menu,
    count,
    countExternal,
    countDisposition,
    countInternalInbox,
    countInternalOutgoing,
    countExternalInbox,
    countExternalOutgoing
  } = props;

  // define current route
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <React.Fragment>
      {/* <Divider /> */}
      <SidebarHeader
        sx={{
          marginTop: '35px'
        }}
      ></SidebarHeader>

      <Box className="custom-sidebar">
        {menu?.map(item => (
          <SidebarListContainer key={item.id}>
            {item.child.length === 0 ? (
              <SingleList
                menu={item}
                currRoute={currentRoute}
                count={count}
                countExternal={countExternal}
                countDisposition={countDisposition}
              />
            ) : (
              <NestedList
                menu={item}
                currRoute={currentRoute}
                count={count}
                countExternal={countExternal}
                countDisposition={countDisposition}
                countInternalInbox={countInternalInbox}
                countInternalOutgoing={countInternalOutgoing}
                countExternalInbox={countExternalInbox}
                countExternalOutgoing={countExternalOutgoing}
              />
            )}
          </SidebarListContainer>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default React.memo(SidebarComponent);
