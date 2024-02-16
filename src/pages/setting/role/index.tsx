import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import { Box, Button, IconButton, Stack } from '@mui/material';
import Table from '@/components/Table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import withAuth from '@/hocs/withAuth';
import { IHeadCell } from '@/components/Table/Table.types';
import { StoreContext } from '@/context/context';
import useSWR, { mutate } from 'swr';
import { http } from '@/utils/httpClient';
import { Article, Delete, VisibilityOutlined } from '@mui/icons-material';

interface IDataRole {
  currentPage: number;
  totalData: number;
  data: {
    id?: string | number;
    description: string;
    status: number;
    created_at: string;
  }[];
}

const headCells: readonly IHeadCell[] = [
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'CreatedAt'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];

const SettingRolePage = () => {
  const { state, actions } = useContext(StoreContext);
  const [role, setRole] = useState<IDataRole>();
  const router = useRouter();

  const updateRole = (row: any) => {
    const data = Buffer.from(JSON.stringify(row)).toString('base64');
    router.push(`/setting/role/update?data=${data}`);
  };

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error } = useSWR(
    `/api/setting/role?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setRole(data);
    }
  }, [data]);

  const TableAction = (item: any) => {
    const data = Buffer.from(JSON.stringify(item)).toString('base64');
    return (
      <div>
        <IconButton
          onClick={() => {
            updateRole(item);
          }}
        >
          <VisibilityOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteRole(item);
          }}
        >
          <Delete />
        </IconButton>
      </div>
      // <Link href={`/outgoing_mail/external/${data}`}>
      //   <Button variant="contained">Detail</Button>
      // </Link>
    );
  };

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function getRole() {
  //     const roleData = await http.get('/api/setting/role', { signal: abortController.signal });

  //     if (roleData.data) {
  //       setRole(roleData?.data);
  //       actions.UPDATE_PAGINATION({
  //         ...state.pagination,
  //         currentPage: roleData.data.currentPage
  //       });
  //     }
  //   }

  //   getRole();

  //   return () => {
  //     abortController.abort();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const deleteRole = async (value: any) => {
    Object.assign(value, { type: 'delete' });
    const deleteData = await http.post(`/api/setting/role`, value);

    mutate(
      `/api/setting/role?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`
    );
    //do something to re-render table
  };

  const updated = async (value: any) => {
    const data = Buffer.from(JSON.stringify(value)).toString('base64');

    router.push(`/setting/role/update?data=${data}`);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Role</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 className="align-month main-title">Role User</h2>
            </Box>
            <Stack direction="row" spacing={1}>
              <Link href={`/setting/role/add`} key={'link1'}>
                <Button style={{ marginRight: '8px' }} className="btn-primary-setting" key="1" variant="contained">
                  Add Role
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Table
            tableData={role?.data}
            headCell={headCells}
            title="List Role"
            totalData={role?.totalData}
            action={TableAction}
          />
        </>
      </LayoutComponent>
    </React.Fragment>
  );
};

export default withAuth(SettingRolePage);
