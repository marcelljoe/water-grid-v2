import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import TableWrapper from '@/components/Table';
import FormModal from '@/pageComponents/Users/Modal';
import { IHeadCell } from '@/components/Table/Table.types';
import withAuth from '@/hocs/withAuth';
import { StoreContext } from '@/context/context';
import { IAccess } from '@/lib/services';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack
} from '@mui/material';
import useSWR, { mutate } from 'swr';

import { http } from '@/utils/httpClient';

const headCells: readonly IHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role'
  },
  {
    id: 'hp',
    numeric: false,
    disablePadding: false,
    label: 'Handphone'
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Created At'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];

interface IDataUser {
  currentPage: number;
  totalData: number;
  data: {
    id: number;
    hp: string;
    name: string;
    role: string;
  }[];
}

interface SettingUserPageProps {
  session: IAccess;
}

const SettingUsersPage: React.FC<SettingUserPageProps> = props => {
  const { state, actions } = useContext(StoreContext);
  const [open, setOpen] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IDataUser | null>(null);
  const [datarow, setDatarow] = React.useState<any>();
  const [dialog, setDialog] = React.useState<boolean>(false);
  const [item, setItem] = React.useState<any>();

  const openModal = (open: boolean, item?: any) => {
    setDatarow(item);
    setOpen(open);
  };

  const openDialog = (item: any) => {
    setDialog(true);
    setItem(item);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error } = useSWR(
    `/api/setting/user?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`,
    fetcher
  );

  const deleteUser = async (values: any) => {
    await http.post('/api/setting/users?type=delete', values);
    mutate(
      `/api/setting/user?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`
    );
    closeDialog();
  };

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  useEffect(() => {
    mutate(
      `/api/setting/user?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`
    );
  }, [open]);

  const TableAction = (item: any) => {
    const data = Buffer.from(JSON.stringify(item)).toString('base64');
    // setItem(item);

    return (
      // <Link href={`/incoming_mail/external/${data}`}>
      <>
        <Button variant="text" onClick={() => openModal(true, item)}>
          Edit
        </Button>
        <Button variant="text" onClick={() => openDialog(item)}>
          {' '}
          Delete{' '}
        </Button>
      </>
      // </Link>
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Users</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 className="align-month main-title">User Setting</h2>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={() => {
                  openModal(true);
                }}
                style={{ marginRight: '8px' }}
                className="btn-primary-setting"
                variant="contained"
              >
                Tambah User
              </Button>
            </Stack>
          </Stack>

          {/* <FormDialog /> */}
          <TableWrapper
            headCell={headCells}
            tableData={user?.data || []}
            totalData={user ? user.totalData : 0}
            title="User List"
            action={TableAction}
          />
          <FormModal modal={open} openModal={openModal} datarow={datarow} />
          <Dialog
            open={dialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Hapus Akun</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ fontSize: 12, color: 'black' }}>
                Apakah anda yakin ingin menghapus data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>Tidak</Button>
              <Button onClick={() => deleteUser(item)} autoFocus>
                Iya
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </LayoutComponent>
    </React.Fragment>
  );
};

export default withAuth(SettingUsersPage);
