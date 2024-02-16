import React, { useEffect } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import withAuth from '@/hocs/withAuth';
import { IHeadCell } from '@/components/Table/Table.types';
import MenuTable from '@/pageComponents/Menu/Table';
import { http } from '@/utils/httpClient';
import { IDataMenu } from '@/pageComponents/Menu/Table/Table.types';
import FormModal from '@/pageComponents/Menu/Modal';
import { Button, Paper, Box, Divider, Stack } from '@mui/material';

const headCells: readonly IHeadCell[] = [
  {
    id: 'collaps',
    numeric: false,
    disablePadding: false,
    label: ''
  },
  {
    id: 'menu',
    numeric: false,
    disablePadding: false,
    label: 'Menu'
  },
  {
    id: 'path',
    numeric: true,
    disablePadding: false,
    label: 'Path'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'sort',
    numeric: true,
    disablePadding: false,
    label: 'Sort'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];

const SettingMenuPage = () => {
  const [menu, setMenu] = React.useState<IDataMenu[]>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [dataRow, setDataRow] = React.useState<[]>([]);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const openModal = (open: boolean, rowData: any, submit?: any) => {
    setOpen(open);
    setDataRow(rowData);
    setIsSubmit(submit);
  };

  const deleted = (row: any) => {};

  const fetchAndUpdateMenuData = async () => {
    const abortController = new AbortController();
    try {
      const updatedMenuData = await http.get('/api/setting/menu', { signal: abortController.signal });

      if (updatedMenuData.data) {
        setMenu(updatedMenuData?.data);
      }
    } catch (error) {
      // Handle errors here, e.g., set an error state.
    }
    abortController.abort();
  };

  // Call the function immediately to load data when the page loads
  useEffect(() => {
    fetchAndUpdateMenuData();
  }, []);

  const handleFormSubmit = async (values: any) => {
    if (values?.type) {
      const deletes = await http.post(`/api/setting/menu`, values);
    } else {
      if (!values?.id) {
        const datas = { menu: values.menu, path: values.path, sort: values.sort, status: values.status, header: 0 };
        const response = await http.post(`/api/setting/menu`, datas);
      } else {
        const datas = Object.assign(values, { type: 'update' });
        const update = await http.post(`/api/setting/menu`, datas);
      }
    }

    // if(response.status == 200 || response.status == 201) {

    // }
    // After submission, trigger the data update
    fetchAndUpdateMenuData();
  };

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function getMenu() {
  //     const menuData = await http.get('/api/setting/menu', { signal: abortController.signal });

  //     if (menuData.data) {
  //       setMenu(menuData?.data);
  //     }
  //   }

  //   getMenu();

  //   return () => {
  //     abortController.abort();
  //   };
  // }, []);

  // useEffect(() => {
  //   // if (open) {
  //   const abortController = new AbortController();

  //   const updateMenu: any = async () => {
  //     try {
  //       const updatedMenuData = await http.get('/api/setting/menu', { signal: abortController.signal });

  //       if (updatedMenuData.data) {
  //         setMenu(updatedMenuData.data);
  //       }
  //     } catch (error) {
  //       // Handle errors here, e.g., set an error state.
  //     }
  //   };

  //   updateMenu();

  //   return () => {
  //     abortController.abort();
  //   };
  //   // }
  // }, [open]);

  return (
    <React.Fragment>
      <Head>
        <title>Menu</title>
      </Head>
      <LayoutComponent>
        <>
          <Box className="head-moment-sub">
            <h2 className="align-month-2">List Menu</h2>
          </Box>
          <Paper
            className="margin-papper"
            sx={{
              marginTop: '37px',
              paddingLeft: 2,
              paddingRight: 2,
              paddingBottom: 3,
              backgroundColor: 'white',
              borderRadius: '10px',
              border: 'none',
              boxShadow: 'none'
            }}
          >
            <Stack className="main-title-row" direction="row" justifyContent="space-between">
              <Box sx={{ marginTop: '120px !important' }} className="head-moment-sub">
                <h2 className="align-month-1 main-title">Table Item</h2>
              </Box>
              <Stack direction="row" spacing={0}>
                <Button
                  sx={{ marginTop: '-72px !important' }}
                  className="btn-primary-setting btn-primary-1"
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  Add Menu
                </Button>
                <Box className="list-table">
                  <Divider sx={{ width: '100%' }} />
                </Box>
              </Stack>
            </Stack>
            <MenuTable data={menu} columns={headCells} modals={openModal} onFormSubmit={handleFormSubmit} />
          </Paper>

          <FormModal modal={open} openModal={openModal} data={dataRow} onFormSubmit={handleFormSubmit} />
        </>
      </LayoutComponent>
    </React.Fragment>
  );
};

// export SettingMenuPage
export default withAuth(SettingMenuPage);
