import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import withAuth from '@/hocs/withAuth';
import { StoreContext } from '@/context/context';
import { IHeadCell } from '@/components/Table/Table.types';
import TableWrapper from '@/components/Table';
import useSWR from 'swr';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack
} from '@mui/material';
import IncomingMailForm from '@/pageComponents/IncomingMail/Form';
import FilterWrapper from '@/components/Filter';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';
import { IAccess } from '@/lib/services';
import MoreAction from '@/components/Table/MoreAction';
import { Info } from '@mui/icons-material';

const headCells: readonly IHeadCell[] = [
  { id: 'is_read', numeric: false, disablePadding: false, label: 'Read' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Tanggal Input' },
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
    id: 'doc_origin',
    numeric: false,
    disablePadding: false,
    label: 'Asal Surat'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];
interface IDataInbox {
  currentPage: number;
  totalData: number;
  data: {
    doc_no: string;
    doc_date: string;
    subject: string;
  }[];
}

interface IIncomingMailPageProps {
  session: IAccess;
}

const IncomingMail: React.FC<IIncomingMailPageProps> = props => {
  const { state } = useContext(StoreContext);
  const [mail, setMail] = useState<IDataInbox>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TableAction = (item: any) => {
    const data = Buffer.from(JSON.stringify({ id: item.id, uuid: item.uuid, is_read: item.is_read })).toString(
      'base64'
    );
    return (
      <MoreAction>
        <>
          <Link href={`/incoming_mail/external/${data}`}>
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

  const { data: data, error } = useSWR(
    `/api/mail/inbox_external?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`,
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
          <title>Surat Masuk External | E-Office Web Apps</title>
        </Head>
        <>
          <LayoutComponent>
            <>
              <Stack className="main-title-row" direction="row" justifyContent="space-between">
                <Box className="head-moment-sub">
                  <h2 title="TEST" className="align-month main-title">
                    Surat Masuk Eksternal
                  </h2>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button className="btn-secondary" onClick={handleClickOpenFilter} variant="contained">
                    Filter
                  </Button>
                  {props.session.m_insert ? (
                    <Button className="btn-primary" onClick={handleClickOpen} variant="contained">
                      Tambah Surat Masuk
                    </Button>
                  ) : null}
                </Stack>
              </Stack>
              <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                PaperProps={{ sx: { borderRadius: '0.75rem', background: '#FFF' } }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem 1.5rem'
                    }}
                  >
                    <DialogTitle sx={{ padding: '0', fontSize: '1.5rem' }}>Surat Masuk</DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        color: '#000'
                      }}
                    >
                      <CloseIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <IncomingMailForm handleClose={handleClose} setOpenSnack={setOpenSnack} />
                  </Grid>
                </Grid>
              </Dialog>
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
              <ConfirmationDialog />
            </>
          </LayoutComponent>
        </>
      </React.Fragment>
    </>
  );
};

export default withAuth(IncomingMail);
