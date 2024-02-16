import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import { FormikProvider, Form as FormikForm } from 'formik';
import LayoutComponent from '@/components/Layout/Layout';
import Form from '@/pageComponents/OutgoingMail/Form';
import FormEdit from '@/pageComponents/OutgoingMail/FormEdit';
import withAuth from '@/hocs/withAuth';
import useCustomFormik from '@/hooks/useCustomFormik';
import { Box, Button, Divider, Drawer, Paper, Stack } from '@mui/material';
import ViewTemplate from '@/pageComponents/Template/Page/ViewTemplate';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { GetServerSideProps, NextApiRequest } from 'next';
import { getLoginSession } from '@/lib/auth';
import { mailService, masterService } from '@/lib/services';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import { ITemplate } from '@/pageComponents/Template/Form/Form.types';
import { StoreContext } from '@/context/context';
import dayjs from 'dayjs';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';
import axios from 'axios';
import OutgoingMailSchema from '@/lib/validation/createOutgoingMail';

const drawerWidth = 850;

const Content = styled('div', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  // background: 'transparent',
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: `-${drawerWidth + 20}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));

interface CreateOutgoingMailProps {
  master: {
    department: optionType[];
    template: optionType[];
    approver: optionType[];
  };
  docNo: string;
  uuid: string;
  user: {
    position: string;
    department: string;
    headPosition: string;
  };
}

const CreateOutgoingMail: React.FC<CreateOutgoingMailProps> = props => {
  const router = useRouter();
  const { state, actions } = React.useContext(StoreContext);
  const { query } = router;

  const handleClickDrawerToggle = () => {
    actions.UPDATE_NAVBAR({ show: !state.openNavbar.show });
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!query.type) {
      router.back(); // Navigate back to the previous page
    }
    actions.UPDATE_NAVBAR({ show: true });
  }, []);

  const formik = useCustomFormik<ITemplate>({
    initialValues: {
      user: props.user,
      isDraft: false,
      mailTypeId: undefined,
      type: query.type as string,
      name: '',
      header: null,
      opener: undefined,
      content: undefined,
      signature: undefined,
      footer: undefined,
      perforation: undefined,
      disposition: undefined,
      backLetter: undefined,
      value: {
        agenda: false,
        diTempat: 'Tangerang',
        subject: '',
        paraf: [],
        docNo: '',
        toGroup: [],
        addressedTo: undefined,
        addressedToEmail: undefined,
        letterDate: dayjs().format('YYYY-MM-DD'),
        from: `${props?.user?.position} ${props?.user?.department}`,
        attachmentLength: undefined,
        files: []
      }
    },
    onSubmit: async values => {
      try {
        const formData = new FormData();
        const jsonBody = values as any;
        formik.values.value?.files.forEach((item: any) => formData.append('file', item));
        for (var key in jsonBody) {
          formData.append(key, typeof jsonBody[key] == 'object' ? JSON.stringify(jsonBody[key]) : jsonBody[key]);
        }
        formData.append('uuid', props.uuid);

        if (query.method == 'edit') {
          formData.append('param', 'outcoming_edit');
          await axios.post('/api/upload', formData);
          // await http.post('/api/mail/outcoming_edit', { ...values, uuid: props.uuid });
        }
        if (query.method == 'create') {
          formData.append('param', 'outcoming_save');
          await axios.post('/api/upload', formData);
        }
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/success.png',
          content: 'Surat Berhasil Tersimpan',
          title: 'Sukses',
          type: 'success',
          onClose: () => {
            formik.resetForm();
            router.reload();
          }
        });
      } catch (error: any) {
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/error.png',
          content: (error as Error).message || 'Terjadi Kesalahan',
          title: 'Error',
          type: 'error',
          onClose: () => {
            router.reload();
          }
        });
      }
    },
    validationSchema: OutgoingMailSchema
  });

  const onSubmitForm = (isDraft: boolean) => {
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/mail_ask.png',
      content: 'Apakah anda yakin ?',
      title: 'Konfirmasi',
      type: 'confirmation',
      onOk: () => {
        formik.setFieldValue('isDraft', isDraft);
        formik.submitForm();
      }
    });
  };

  const MailForm = useMemo(() => {
    if (query.method == 'create') {
      return (
        <Form
          open={state.openNavbar.show}
          formik={formik}
          master={props.master}
          mailType={query.type as string}
          docNo={props.docNo}
        />
      );
    }

    return (
      <FormEdit
        open={state.openNavbar.show}
        formik={formik}
        master={props.master}
        mailType={query.type as string}
        uuid={props.uuid}
        method="edit"
      />
    );
  }, [formik, state.openNavbar.show]);

  return (
    <React.Fragment>
      <Head>
        <title>Surat Keluar | E-Office Web Apps</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 title="Buat Surat" className="align-month main-title">
                Buat Surat
              </h2>
            </Box>
            <Stack className="button-template">
              <Button
                sx={{ margin: '5px' }}
                className="btn-primary width-template-button"
                variant="contained"
                onClick={handleBack}
              >
                Kembali
              </Button>
              <Button
                sx={{ margin: '5px' }}
                className="btn-primary width-template-button"
                variant="contained"
                onClick={() => onSubmitForm(false)}
              >
                Simpan Surat
              </Button>
              {(query.d == '1' || !query?.d) && (
                <Button
                  sx={{ margin: '5px' }}
                  className="btn-secondary width-template-button"
                  variant="contained"
                  onClick={() => onSubmitForm(true)}
                >
                  {' '}
                  Simpan Draft
                </Button>
              )}
              <Button
                sx={{ margin: '5px' }}
                className="btn-secondary width-template-button"
                variant="contained"
                onClick={handleClickDrawerToggle}
              >
                Preview
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" className="responsive-template">
            <Content open={state.openNavbar.show}>
              <FormikProvider value={formik}>
                <Paper
                  sx={{
                    borderRadius: '0.875rem',
                    backgroundColor: '#FFF'
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ padding: '20px 30px' }}
                  >
                    <h5 className="card-title">Edit Surat</h5>
                  </Stack>
                  <Divider />

                  <FormikForm>{MailForm}</FormikForm>
                </Paper>
              </FormikProvider>
            </Content>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth
                }
              }}
              className="paper-drawer"
              variant="persistent"
              anchor="right"
              open={state.openNavbar.show}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ padding: '20px 30px' }}
              >
                <h5 className="card-title">Preview Surat</h5>
              </Stack>
              <Divider />
              <ViewTemplate values={formik.values} formik={formik} />
            </Drawer>
          </Stack>
        </>
      </LayoutComponent>
      <ConfirmationDialog />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const method = ctx.query.method as string;
  const allowedMethod = ['create', 'edit'];
  let template;

  if (!allowedMethod.includes(method as string)) {
    return {
      notFound: true
    };
  }

  const session = await getLoginSession(ctx.req as NextApiRequest);
  const department = await masterService.getMasterEmployeeDepartment(session?.session as string);
  const initValue = await mailService.getInitiateMailValue(
    session?.session as string,
    ctx.query.type as string,
    method
  );

  if (method == 'create') template = await mailService.getListMailTemplateByType(session?.session as string, '2');
  if (department?.statusCode == 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
      master: {
        template: template || [],
        department
      },
      docNo: method == 'create' ? initValue?.docNo || '' : '',
      uuid: ctx.query.uuid || '',
      user: initValue?.user || ''
    }
  };
};

export default withAuth(CreateOutgoingMail, '/outgoing_mail');
