//react & next
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
//component
import LayoutComponent from '@/components/Layout/Layout';
import { StoreContext } from '@/context/context';
import { IHeadCell } from '@/components/Table/Table.types';
import TableWrapper from '@/components/Table';
import useCustomFormik from '@/hooks/useCustomFormik';
import FilterWrapper from '@/components/Filter';
import IncomingMailSchema from '@/lib/validation/createIncomingMail';
import MoreAction from '@/components/Table/MoreAction';

//mui material
import { Alert, Box, Button, Snackbar, Stack, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
//mui icon
import { Info } from '@mui/icons-material';

//swr
import useSWR, { mutate } from 'swr';
//utils
import withAuth from '@/hocs/withAuth';
import axios from 'axios';

const headCells: readonly IHeadCell[] = [
  { id: 'is_read', numeric: false, disablePadding: false, label: 'Read' },

  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: 'Tanggal Input'
  },
  {
    id: 'doc_no',
    numeric: false,
    disablePadding: false,
    label: 'No Surat'
  },
  {
    id: 'doc_date',
    numeric: false,
    disablePadding: false,
    label: 'Tanggal Surat'
  },
  {
    id: 'subject',
    numeric: false,
    disablePadding: false,
    label: 'Perihal'
  },
  {
    id: 'last_updated',
    numeric: false,
    disablePadding: false,
    label: 'Last Update Disposisi'
  },

  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];

interface IDataDisposition {
  currentPage: number;
  totalData: number;
  data: {
    doc_no: string;
    doc_date: string;
    subject: string;
  }[];
}

const Disposition = () => {
  const { state, actions } = useContext(StoreContext);
  const [mail, setMail] = useState<IDataDisposition>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const TableAction = (item: any) => {
    const newValue = { mailOutgoingId: item.mailOutgoingId, mailIncomingId: item.mailIncomingId, doc_no: item.doc_no };
    const data = Buffer.from(JSON.stringify(newValue)).toString('base64');
    return (
      <MoreAction>
        <>
          <Link href={`/disposition/${data}`}>
            <MenuItem>
              <ListItemIcon>
                <Info fontSize="small" />
              </ListItemIcon>
              <ListItemText>Detail</ListItemText>
            </MenuItem>
          </Link>
        </>
      </MoreAction>
    );
  };

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const { data: data, error } = useSWR(
    `/api/mail/disposition?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setMail(data);
    }
  }, [data]);

  return (
    <>
      <React.Fragment>
        <Head>
          <title>Surat Disposisi | E-Office Web Apps</title>
        </Head>
        <>
          <LayoutComponent>
            <>
              <Stack className="main-title-row" direction="row" justifyContent="space-between">
                <Box className="head-moment-sub">
                  <h2 title="TEST" className="align-month main-title">
                    Surat Disposisi
                  </h2>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    className="btn-secondary btn-secondary-single"
                    onClick={handleClickOpenFilter}
                    variant="contained"
                  >
                    Filter
                  </Button>
                </Stack>
              </Stack>

              <TableWrapper
                headCell={headCells}
                tableData={mail?.data}
                title="List Surat Masuk"
                totalData={mail?.totalData}
                action={TableAction}
              />

              <FilterWrapper
                handleClose={handleCloseFilter}
                handleOpen={handleClickOpenFilter}
                openModal={openFilter}
              />

              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                key={'top' + 'right'}
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
              >
                <Alert onClose={handleCloseSnack} severity={state.notification.type}>
                  {state.notification.message}
                </Alert>
              </Snackbar>
            </>
          </LayoutComponent>
        </>
      </React.Fragment>
    </>
  );
};

export default withAuth(Disposition);
