import React, { useEffect } from 'react';
import Head from 'next/head';
import { FormikProvider, Form as FormikForm } from 'formik';
import withAuth from '@/hocs/withAuth';
import useCustomFormik from '@/hooks/useCustomFormik';
import { http } from '@/utils/httpClient';
import { Box, Button, Divider, Drawer, Paper, Stack } from '@mui/material';
import LayoutComponent from '@/components/Layout/Layout';
import Form from '@/pageComponents/Template/Form';
import ViewTemplate from '@/pageComponents/Template/Page/ViewTemplate';
const SnackbarComponent = dynamic(() => import('@/components/Snackbar'), { ssr: false });
import { styled } from '@mui/material/styles';
import { GetServerSideProps, NextApiRequest } from 'next';
import { getLoginSession } from '@/lib/auth';
import { mailService } from '@/lib/services';
import { IComponent, ITemplate } from '@/pageComponents/Template/Form/Form.types';
import dynamic from 'next/dynamic';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';
import { StoreContext } from '@/context/context';

const drawerWidth = 850;

const Content = styled('div', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
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

interface CreateTemplatePageProps {
  master: {
    component: IComponent;
    template: ITemplate;
  };
  type: string;
}

const CreateTemplatePage: React.FC<CreateTemplatePageProps> = props => {
  const [open, setOpen] = React.useState(true);
  const { state, actions } = React.useContext(StoreContext);

  const formik = useCustomFormik<ITemplate>({
    initialValues: {
      name: '',
      header: null,
      opener: undefined,
      content: undefined,
      signature: undefined,
      footer: undefined,
      perforation: undefined,
      disposition: undefined,
      backLetter: undefined
    },
    onSubmit: async values => {
      try {
        await http.post(`/api/mail/mail_template`, values);
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/success.png',
          content: 'Template Berhasil Tersimpan',
          title: 'Sukses',
          type: 'success'
        });

        formik.resetForm();
      } catch (error: any) {
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/error.png',
          content: 'Terjadi Kesalahan',
          title: 'Error',
          type: 'error'
        });
      }
    }
  });

  const onSubmitForm = () => {
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/mail_ask.png',
      content: 'Apakah anda yakin ?',
      title: 'Konfirmasi',
      type: 'confirmation',
      onOk: () => {
        formik.submitForm();
      }
    });
  };

  const handleClickDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (props.type == 'update') {
      // formik.setFieldValue('header', props.master.template.header)
      formik.setValues(props.master.template);
    }
  }, []);

  return (
    <React.Fragment>
      <LayoutComponent>
        <React.Fragment>
          <Head>
            <title>Create Template | E-Office Web Apps</title>
          </Head>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 title="TEST" className="align-month main-title">
                Buat Template Baru
              </h2>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button className="btn-primary btn-primary-2" variant="contained" type="submit" onClick={onSubmitForm}>
                Simpan Surat
              </Button>
              <Button className="btn-secondary btn-secondary-2" variant="contained" onClick={handleClickDrawerToggle}>
                Preview Surat
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" className="responsive-template">
            <Content open={open}>
              <FormikProvider value={formik}>
                <Paper
                  sx={{
                    paddingBottom: '30px',
                    borderRadius: '0.875rem',
                    backgroundColor: '#FFF'
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ padding: '20px 30px 20px' }}
                  >
                    <h5 className="card-title">Template Surat</h5>
                  </Stack>
                  <Divider />
                  <FormikForm>
                    <Form master={props.master} open={open} />
                  </FormikForm>
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
              open={open}
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
              <ViewTemplate values={formik.values} />
            </Drawer>
          </Stack>
        </React.Fragment>
      </LayoutComponent>
      <SnackbarComponent />
      <ConfirmationDialog />
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { doc_type, type } = ctx.query;
  const allowedType = ['create', 'update'];
  const session = await getLoginSession(ctx.req as NextApiRequest);
  const component = await mailService.getComponent(session?.session as string);
  let template = null;

  if (component?.statusCode == 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  if (!allowedType.includes(type as string)) {
    return {
      notFound: true
    };
  }

  if (type == 'update') {
    template = await mailService.getMailTemplateByName(session?.session as string, doc_type as string);
  }

  return {
    props: {
      master: {
        component,
        template
      },
      type
    }
  };
};

export default withAuth(CreateTemplatePage, '/template');
