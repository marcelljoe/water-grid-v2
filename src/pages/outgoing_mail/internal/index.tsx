import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import withAuth from '@/hocs/withAuth';
import { StoreContext } from '@/context/context';
import { IHeadCell } from '@/components/Table/Table.types';
import TableWrapper from '@/components/Table';
import useSWR from 'swr';

import { Box, Button, ListItemIcon, ListItemText, Stack, MenuItem } from '@mui/material';
import FilterWrapper from '@/components/Filter';
import Link from 'next/link';
import { http } from '@/utils/httpClient';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';
import { useRouter } from 'next/router';
import MoreAction from '@/components/Table/MoreAction';
import { Delete, Info } from '@mui/icons-material';

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
    id: 'mail_status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
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

const IncomingMail = () => {
  const { state, actions } = useContext(StoreContext);
  const [mail, setMail] = useState<IDataInbox>();
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const handleDeleteDraft = async (item: any) => {
    try {
      await http.post(`/api/mail/draftDeleteOutbox`, item);
      actions.UPDATE_DIALOG({
        ...state.dialog,
        show: true,
        image: '/images/success.png',
        content: `Data dengan nomor surat ${item.doc_no} Berhasil Dihapus`,
        title: 'Sukses',
        type: 'success',
        onClose: () => {
          router.reload();
        }
      });
    } catch (error) {
      actions.UPDATE_DIALOG({
        ...state.dialog,
        show: true,
        image: '/images/error.png',
        content: (error as Error).message || 'Terjadi Kesalahan',
        title: 'Error',
        type: 'error'
      });
    }
  };

  const openDialog = (item: any) => {
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/mail_ask.png',
      content: `Apakah anda yakin ingin menghapus data dengan nomor surat: ${item.doc_no}?`,
      title: 'Konfirmasi',
      type: 'confirmation',
      onOk: () => {
        handleDeleteDraft(item);
      }
    });
  };

  const TableAction = (item: any) => {
    const data = Buffer.from(JSON.stringify({ id: item.id, uuid: item.uuid, is_read: item.is_read })).toString(
      'base64'
    );
    return (
      <MoreAction>
        <>
          <Link href={`/outgoing_mail/internal/${data}`}>
            <MenuItem>
              <ListItemIcon>
                <Info fontSize="small" />
              </ListItemIcon>
              <ListItemText>Detail</ListItemText>
            </MenuItem>
          </Link>
          {item.status == 0 ? (
            <MenuItem
              disabled={item?.status == 0 ? false : true}
              onClick={() => openDialog({ id: item.id, doc_no: item.doc_no })}
            >
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          ) : null}
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
    `/api/mail/outbox_internal?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}&statusLetter=${state.filter.statusLetter}`,
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
          <title>Surat Keluar Internal | E-Office Web Apps</title>
        </Head>
        <>
          <LayoutComponent>
            <>
              <Stack className="main-title-row" direction="row" justifyContent="space-between">
                <Box className="head-moment-sub">
                  <h2 title="outgoingMailExternal" className="align-month main-title">
                    Surat Keluar Internal
                  </h2>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button className="btn-secondary btn-secondary-2" onClick={handleClickOpenFilter} variant="contained">
                    Filter
                  </Button>
                  <Link href="/outgoing_mail/create?type=1">
                    <Button className="btn-primary-double" variant="contained">
                      Tambah Surat Keluar
                    </Button>
                  </Link>
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
                type={'Outgoing'}
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
