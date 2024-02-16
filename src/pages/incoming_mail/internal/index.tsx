import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import withAuth from '@/hocs/withAuth';
import { StoreContext } from '@/context/context';
import { IHeadCell } from '@/components/Table/Table.types';
import TableWrapper from '@/components/Table';
import useSWR, { mutate } from 'swr';
import { Box, Button, ListItemIcon, ListItemText, MenuItem, Stack } from '@mui/material';

import useCustomFormik from '@/hooks/useCustomFormik';
import FilterWrapper from '@/components/Filter';
import IncomingMailSchema from '@/lib/validation/createIncomingMail';
import Link from 'next/link';
import axios from 'axios';
import MoreAction from '@/components/Table/MoreAction';
import { Info } from '@mui/icons-material';

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
  const [open, setOpen] = React.useState<boolean>(false);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<any>([]);

  const createMail = async (values: any) => {
    const formData = new FormData();
    formData.append('id', values.id);
    values.attachment.forEach((item: any) => formData.append('file', item));
    formData.append('doc_date', values.letterDate);
    formData.append('doc_no', values.letterNumber);
    formData.append('description', values.letterDescription);
    formData.append('doc_from', values.letterFrom);
    formData.append('regard', values.regarding);
    formData.append('type', '1');

    const response = await axios.post('/api/upload', formData);

    if (response.status == 200 || response.status == 201) {
      mutate(
        `/api/mail/inbox_internal?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`
      );
      actions.UPDATE_NOTIFICATION({
        ...state.notification,
        type: 'success',
        message: 'Berhasil membuat Surat Masuk'
      });
    } else {
      actions.UPDATE_NOTIFICATION({
        ...state.notification,
        type: 'error',
        message: 'Something went wrong'
      });
    }
  };

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      letterNumber: '',
      letterDate: '',
      regarding: '',
      letterFrom: '',
      letterDescription: '',
      attachment: '',
      employee: [],
      notes: ''
    },
    validationSchema: IncomingMailSchema,

    onSubmit: values => {
      Object.assign(values, { attachment: files });
      createMail(values);
      handleClose();
      formik.resetForm();
    }
  });

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const TableAction = (item: any) => {
    const data = Buffer.from(JSON.stringify({ id: item.id, uuid: item.uuid, is_read: item.is_read })).toString(
      'base64'
    );
    return (
      <MoreAction>
        <>
          <Link href={`/incoming_mail/internal/${data}`}>
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
    `/api/mail/inbox_internal?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`,
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
          <title>Surat Masuk Internal | E-Office Web Apps</title>
        </Head>
        <>
          <LayoutComponent>
            <>
              <Stack className="main-title-row" direction="row" justifyContent="space-between">
                <Box className="head-moment-sub">
                  <h2 title="TEST" className="align-month main-title">
                    Surat Masuk Internal
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
            </>
          </LayoutComponent>
        </>
      </React.Fragment>
    </>
  );
};

export default withAuth(IncomingMail);
