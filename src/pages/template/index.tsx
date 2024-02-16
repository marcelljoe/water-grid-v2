import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import Table from '@/components/Table';
import FormModal from '@/pageComponents/Users/Modal';
import { IHeadCell } from '@/components/Table/Table.types';
import { http } from '@/utils/httpClient';
import withAuth from '@/hocs/withAuth';
import { StoreContext } from '@/context/context';
import { IAccess } from '@/lib/services';
import Link from 'next/link';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';

const headCells: readonly IHeadCell[] = [
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Nama Surat'
  },
  {
    id: 'doc_type',
    numeric: false,
    disablePadding: false,
    label: 'Jenis Surat'
  },
  {
    id: 'status',
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

interface IDataMailTemplate {
  currentPage: number;
  totalData: number;
  data: {
    id: number;
    description: string;
    doc_type: string;
    status: number;
  }[];
}

interface MailTemplatePageProps {
  session: IAccess;
}

const MailTemplate: React.FC<MailTemplatePageProps> = props => {
  const { state, actions } = useContext(StoreContext);
  const [open, setOpen] = React.useState<boolean>(false);
  const [template, setTemplate] = React.useState<IDataMailTemplate | null>(null);
  const router = useRouter();

  const openModal = (open: boolean) => {
    setOpen(open);
  };

  const TableAction = (item: any) => {
    return (
      <div>
        <IconButton onClick={() => router.push(`/template/update/?doc_type=${item.description}`)}>
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            actions.UPDATE_DIALOG({
              ...state.dialog,
              show: true,
              image: '/images/mail_ask.png',
              content: 'Apakah anda yakin ?',
              title: 'Konfirmasi',
              type: 'confirmation',
              onOk: () => {}
            });
          }}
        >
          <Delete />
        </IconButton>
      </div>
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function getTemplate() {
      const query = `?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}
        &direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}
        &status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`;
      const templateData = await http.get('/api/mail/mail_template' + query, { signal: abortController.signal });

      if (templateData.data) {
        setTemplate(templateData?.data);
      }
    }

    getTemplate();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filter, state.pagination]);

  return (
    <React.Fragment>
      <Head>
        <title>Mail Template</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 title="TEST" className="align-month main-title">
                Template Surat
              </h2>
            </Box>
            <Link href={`/template/create`} key={'link1'}>
              <Button className="btn-primary" variant="contained">
                Tambah Template
              </Button>
            </Link>
          </Stack>
          <Table
            headCell={headCells}
            tableData={template?.data || []}
            totalData={template ? template.totalData : 0}
            title="Template List"
            action={TableAction}
          />
          <FormModal modal={open} openModal={openModal} />
        </>
      </LayoutComponent>
      <ConfirmationDialog />
    </React.Fragment>
  );
};

export default withAuth(MailTemplate);
