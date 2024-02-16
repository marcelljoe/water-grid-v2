import React, { useCallback, useContext, useEffect } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LayoutComponent from '@/components/Layout/Layout';
import { StoreContext } from '@/context/context';
import { http } from '@/utils/httpClient';
import useCustomFormik from '@/hooks/useCustomFormik';
import { Field, FormikProvider, Form as FormikForm, useFormik } from 'formik';
import { dispositionSchema2 } from '@/lib/validation';
import dayjs from 'dayjs';
import * as yup from 'yup';

import TextField from '@/components/Form/TextField';
import {
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  Person,
  LockClock,
  Close,
  MailOutline,
  Description as DescriptionIcon,
  FileCopy,
  TagOutlined,
  Event
} from '@mui/icons-material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Switch from '@/components/FormControlled/Formik/Switch';
import {
  InputAdornment,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack
} from '@mui/material';
import IncomingMailFormDispositionOutgoing from '@/pageComponents/IncomingMail/FormDispositionOutgoing';
import withAuth from '@/hocs/withAuth';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import { getLoginSession } from '@/lib/auth';
import PrintPdf from '@/pageComponents/OutgoingMail/pdf';
import { IAccess, mailService } from '@/lib/services';
import Link from 'next/link';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';
import { sessionService } from '@/lib/services';

interface DetailOutgoingMailProps {
  detailData: {
    id: number;
    uuid: string;
    is_read: number;
  };
  history: any;
  mailDetail: any;
  master: {
    employee: optionType[];
  };
  session: IAccess;
  createdMail: any;
  employeeLogin: any;
  finalApproval: any;
}

const DetailOutgoingMailInternal = (props: DetailOutgoingMailProps) => {
  const router = useRouter();
  const { state, actions } = useContext(StoreContext);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openDialogApprove, setDialogApprove] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [historyData, setHistoryData] = React.useState<any>(props.history);

  interface PasswordInit {
    password: string;
  }

  const fetchHistory = async () => {
    try {
      const response = await http.get(`/api/mail/history?history=${props.detailData.id}&type=${2}`);
      // Handle the fetched history data here, e.g., update state or perform actions
      return response.data; // Return the fetched data if needed
    } catch (error) {
      throw error; // Throw the error or handle it as required
    }
  };

  const createDisposition = async (values: any) => {
    const response = await http.post('/api/mail/outcoming_disposition', values);
    if (response.status == 200 || response.status == 201) {
      const updatedHistory = await fetchHistory();
      setHistoryData(updatedHistory);

      actions.UPDATE_DIALOG({
        ...state.dialog,
        show: true,
        image: '/images/success.png',
        content: 'Disposisi Berhasil',
        title: 'Sukses',
        type: 'success',
        onClose: () => {
          setOpenDialog(false);
        }
      });
    }
  };

  const updateStatus = useCallback(async () => {
    const data = {
      mailId: props.detailData.id,
      type: 2
    };
    const response = await http.post('/api/mail/updateDisposition', data);
    (!props.detailData?.is_read || props.detailData.is_read == 0) &&
      (await http.post('/api/mail/updateIsRead', { mailId: props.detailData.id, type: 'outbox' }));

    const updatedHistory = await fetchHistory();
    setHistoryData(updatedHistory);
  }, [props.detailData]);

  useEffect(() => {
    updateStatus();
  }, []);

  const passwordSchema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required')
  });

  const formikPassword = useFormik({
    initialValues: {
      password: ''
    } as PasswordInit,
    validationSchema: passwordSchema,
    onSubmit: async values => {
      try {
        const body = {
          mailId: props.detailData.id,
          password: values.password
        };
        await http.post(`/api/mail/mail_approval`, body);
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/success.png',
          content: 'Surat Berhasil Tersimpan',
          title: 'Sukses',
          type: 'success',
          onClose: () => {
            if (props?.employeeLogin.id === props?.finalApproval.approver) {
              sendAfterApprove();
            } else {
              router.reload();
            }
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
    }
  });

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      mailOutgoingId: props.detailData?.id,
      doc_no: props.mailDetail?.doc_no,
      doc_date: props.mailDetail?.doc_date,
      status: props.mailDetail?.status,
      subject: props.mailDetail?.subject,
      input_date: props.mailDetail?.created_at,
      doc_origin: props.mailDetail?.doc_origin,
      description: props.mailDetail?.description,
      employee: [],
      notes: '',
      date: dayjs().format('YYYY-MM-DD')
    },
    validationSchema: dispositionSchema2,

    onSubmit: values => {
      createDisposition(values);
      handleResetForm();
    }
  });

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleResetForm = () => {
    formik.resetForm();
  };

  const handleRedirect = () => {
    formik.resetForm();

    router.push('/outgoing_mail/internal');
  };

  const handleShowPassword = () => {
    setShowPassword(open => !open);
  };

  const handleClickOpenDialogApprove = () => {
    setDialogApprove(true);
  };

  const handleCloseDialogApprove = () => {
    setDialogApprove(false);
    setChecked(false);
  };

  const handleOpenDialogReject = () => {
    setDialogApprove(false);
    setChecked(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSendMail = async () => {
    await http.post(`/api/mail/mail_send`, {
      mailId: props.detailData.id,
      type: '1',
      createdMailId: props?.mailDetail?.createdMail?.res[0].id
    });
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/success.png',
      content: 'Surat Berhasil Dikirim',
      title: 'Sukses',
      type: 'success',
      onClose: () => {
        router.reload();
      }
    });
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/mail_ask.png',
      content: 'Apakah anda yakin ?',
      title: 'Konfirmasi',
      type: 'confirmation',
      onOk: () => {
        formikPassword.submitForm();
      }
    });
  };

  const sendAfterApprove = () => {
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/mail_ask.png',
      content: 'Apakah anda yakin langsung ingin mengirim surat?',
      title: 'Konfirmasi',
      type: 'confirmation',
      onOk: () => {
        handleSendMail();
      },
      onCancel: () => {
        router.reload();
      }
    });
  };

  const mappingEmployee = props.master.employee
    ?.filter((a: any) => a.value !== props.employeeLogin?.id)
    .map((a: any) => ({ value: a.value, label: a.label }));

  return (
    <React.Fragment>
      <Head>
        <title>Detail Surat Keluar Internal</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 title="Detail Surat Keluar - Internal" className="align-month main-title">
                Detail Surat Keluar - Internal
              </h2>
            </Box>
            <Stack direction="row" spacing={1}>
              {props.mailDetail?.editable && (
                <Link
                  href={'/outgoing_mail/edit?type=1&uuid=' + props.detailData?.uuid + `&d=${props.mailDetail.isDraft}`}
                >
                  <Button className="btn-primary" variant="contained">
                    Ubah Surat
                  </Button>
                </Link>
              )}
              {props.mailDetail?.approver && (
                <Button className="btn-primary" variant="contained" onClick={handleClickOpenDialogApprove}>
                  Approval Surat
                </Button>
              )}
              {props.mailDetail?.isSend && (
                <Button className="btn-secondary" fullWidth variant="contained" onClick={handleSendMail}>
                  Kirim
                </Button>
              )}
            </Stack>
          </Stack>
          <Grid container spacing={3} sx={{ flexDirection: { xs: 'column-reverse', lg: 'row' } }}>
            <Grid item xs={12} md={12} lg={8}>
              <Paper
                sx={{
                  borderRadius: '0.875rem',
                  backgroundColor: '#eceef1'
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ minHeight: 70, padding: '0px 30px' }}
                >
                  <h5 className="card-title">Preview Surat</h5>
                </Stack>
                <Divider />
                <Stack className="custom-mail" justifyContent="center" alignItems="center">
                  <PrintPdf mailDetail={props.mailDetail} type="1" />
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Stack direction="column" spacing={3}>
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
                    style={{ minHeight: 70, padding: '0px 30px' }}
                  >
                    <h5 className="card-title">Detail Surat</h5>
                  </Stack>
                  <Divider />
                  <List className="info-list" style={{ padding: '15px 15px 15px' }}>
                    <ListItem sx={{ padding: '10px 0 ' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                          variant="square"
                        >
                          <TagOutlined sx={{ color: '#A9B2BF' }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Nomor Surat" secondary={props.mailDetail?.doc_no} />
                      <Chip
                        label="Status"
                        size="small"
                        className="chip-custom"
                        style={{
                          borderRadius: '6px',
                          background: '#A9B2BF',
                          color: 'white',
                          fontSize: 11,
                          marginRight: '1vh'
                        }}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ padding: '10px 0 ' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                          variant="square"
                        >
                          <Event sx={{ color: '#A9B2BF' }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Tanggal Dokumen"
                        secondary={dayjs(props.mailDetail?.doc_date).format('YYYY-MM-DD')}
                      />
                    </ListItem>
                    <Divider />

                    <ListItem sx={{ padding: '10px 0' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                          variant="square"
                        >
                          <MailOutline sx={{ color: '#A9B2BF' }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Subjek Surat" secondary={props.mailDetail?.subject} />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ padding: '10px 0' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                          variant="square"
                        >
                          <DescriptionIcon sx={{ color: '#A9B2BF' }}></DescriptionIcon>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Deskripsi Surat" secondary={props.mailDetail?.description || '-'} />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ padding: '10px 0' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                          variant="square"
                        >
                          <Person sx={{ color: '#A9B2BF' }}></Person>
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={'Pembuat Surat'}
                        secondary={
                          props.mailDetail?.createdMail.res[0].NIP + ' - ' + props.mailDetail?.createdMail.res[0].name
                        }
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '10px 0' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                          variant="square"
                        >
                          <LockClock sx={{ color: '#A9B2BF' }}></LockClock>
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={'Tanggal Buat Surat'}
                        secondary={dayjs(props?.mailDetail?.createdMail.date).format('YYYY-MM-DD HH:mm:ss')}
                      />
                    </ListItem>
                    {props.mailDetail?.mailAttachment.map((item: any, i: number) => (
                      <>
                        <Divider />
                        <ListItem sx={{ padding: '10px 0' }}>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: '#F6F7F9', borderRadius: 2, marginLeft: '1vh', marginRight: '2vh' }}
                              variant="square"
                            >
                              <FileCopy sx={{ color: '#A9B2BF' }} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={`Lampiran ${i + 1}`} />
                          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_DOMAIN}/api/file/${item.path}`}>
                            <Chip
                              label="Link"
                              size="small"
                              className="chip-custom"
                              style={{
                                borderRadius: '6px',
                                background: '#A9B2BF',
                                color: 'white',
                                fontSize: 11,
                                marginRight: '1vh'
                              }}
                            />
                          </Link>
                        </ListItem>
                      </>
                    ))}
                  </List>
                </Paper>
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
                    style={{ minHeight: 70, padding: '0px 30px' }}
                  >
                    <h5 className="card-title">Riwayat Paraf</h5>
                  </Stack>
                  <Divider />
                  <Timeline
                    className="timeline-custom"
                    sx={{
                      margin: '20px 20px 40px',
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0
                      }
                    }}
                  >
                    {props.mailDetail?.mailApproval?.map((item: any, index: number) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            style={{
                              backgroundColor: item.status == 0 ? '#A5AEBC' : '#5DDEBF'
                            }}
                          />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={item.status == 0 ? 'Unsigned' : 'Signed'}
                              size="small"
                              className="chip-custom"
                              style={{
                                borderRadius: '6px',
                                background: item.status == 0 ? '#A9B2BF' : '#5DDEBF',
                                color: 'white',
                                fontSize: 11
                              }}
                            />
                            <h6>{item.approved_at ? dayjs(item.approved_at).format('DD MMMM YYYY HH:mm:ss') : ''}</h6>
                          </Stack>
                          <Box style={{ margin: '20px 0 10px' }}>
                            <h5>
                              {item.approvedBy?.nip} - {item.approvedBy?.name}
                            </h5>
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Paper>
                {historyData?.length == 0 ? null : (
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
                      style={{ minHeight: 70, padding: '0px 30px' }}
                    >
                      <h5 className="card-title">Riwayat Surat</h5>
                    </Stack>
                    <Divider />
                    <Timeline
                      className="timeline-custom"
                      sx={{
                        margin: '20px 20px 40px',
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0
                        }
                      }}
                    >
                      {historyData?.map((item: any, index: number) => (
                        <TimelineItem key={index}>
                          <TimelineSeparator>
                            <TimelineDot
                              style={{
                                backgroundColor: item.status == 0 ? '#A5AEBC' : '#5DDEBF'
                              }}
                            />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Chip
                                label={item.status == 0 ? 'Terkirim' : 'Terbaca'}
                                size="small"
                                className="chip-custom"
                                style={{
                                  borderRadius: '6px',
                                  background: item.status == 0 ? '#A9B2BF' : '#5DDEBF',
                                  color: 'white',
                                  fontSize: 11
                                }}
                              />
                              <h6>{dayjs(item.created_at).format('DD MMMM YYYY - HH:mm:ss')}</h6>
                            </Stack>
                            <Box style={{ margin: '20px 0 10px' }}>
                              <h5>{item.NIP + ' | ' + item.name}</h5>
                              <h6>{item.note}</h6>
                            </Box>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Paper>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Dialog
            open={openDialogApprove}
            onClose={handleCloseDialogApprove}
            fullWidth={true}
            maxWidth={'xs'}
            PaperProps={{ sx: { borderRadius: '20px', padding: '25px 0 0', background: '#FFF' } }}
          >
            <FormikProvider value={formikPassword}>
              <FormikForm onSubmit={onSubmitForm}>
                <Stack direction="row" sx={{ padding: '0 25px' }} justifyContent="space-between">
                  <DialogTitle sx={{ padding: '0', fontSize: '1.5rem' }}>Approval Surat</DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseDialogApprove}
                    sx={{
                      color: '#000'
                    }}
                  >
                    <Close sx={{ width: '1.5rem', height: '1.5rem', padding: 0 }} />
                  </IconButton>
                </Stack>
                <Stack direction="column" sx={{ padding: '0 25px' }} justifyContent="center" alignItems="center">
                  <img
                    className="icon-image"
                    src={!checked ? '/images/sign.png' : '/images/sign.gif'}
                    alt="sin Image"
                    width={320}
                    height={320}
                  />
                  <p style={{ fontSize: '12px', color: '#536580', marginBottom: '25px', textAlign: 'center' }}>
                    {/* Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,{' '} */}
                  </p>
                  <Switch
                    value={checked}
                    label={props.mailDetail?.is_approve == 2 && props.mailDetail?.approver ? 'Tanda Tangan' : 'Paraf'}
                    onChange={handleChange}
                  />
                  {checked && (
                    <div style={{ marginTop: '15px', width: '100%' }}>
                      <Field
                        style={{ width: '100%' }}
                        component={TextField}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="password-field"
                        placeholder="Password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton style={{ marginLeft: -30 }} onClick={handleShowPassword}>
                                {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                  )}
                </Stack>
                <Stack
                  style={{ padding: '25px', marginTop: '25px', width: '100%', borderTop: '1px solid #E2E8F0' }}
                  direction="row"
                  spacing={2}
                >
                  <Button
                    className="btn-primary"
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={formikPassword.isSubmitting || !formikPassword.isValid || !formikPassword.dirty}
                  >
                    Approve
                  </Button>
                  <Button className="btn-secondary" fullWidth variant="contained" onClick={handleOpenDialogReject}>
                    Disposisi Ulang
                  </Button>
                </Stack>
              </FormikForm>
            </FormikProvider>
          </Dialog>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth={true}
            maxWidth={'sm'}
            PaperProps={{ sx: { borderRadius: '20px', padding: '25px', background: '#FFF' } }}
          >
            <Stack direction="row" justifyContent="space-between">
              <DialogTitle sx={{ padding: '0', fontSize: '1.5rem' }}>Disposisi Surat</DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  color: '#000'
                }}
              >
                <Close sx={{ width: '1.5rem', height: '1.5rem' }} />
              </IconButton>
            </Stack>
            <FormikProvider value={formik}>
              <FormikForm>
                <IncomingMailFormDispositionOutgoing
                  isSubmitting={formik.isSubmitting}
                  isValid={formik.isValid}
                  dirty={formik.dirty}
                  values={formik.values}
                  handleClose={handleRedirect}
                  employee={mappingEmployee}
                  type={'internal'}
                />
              </FormikForm>
            </FormikProvider>
          </Dialog>
          <ConfirmationDialog />
        </>
      </LayoutComponent>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const query = ctx.query;
  const data = JSON.parse(Buffer.from(query.type as string, 'base64').toString('ascii'));
  const session = await getLoginSession(ctx.req as NextApiRequest);
  const employee = await mailService.getDispositionEmployee(session?.session as string, 1);
  let history = await mailService.getHistory(session?.session as string, data.id, 2);
  const mailDetail = await mailService.getDetailOutgoingMail(session?.session as string, data.id);
  const me = await sessionService.getSessionProfile(session?.session as string);
  const getFinalApprover = await mailService.getValidationPosition(session?.session as string, data.id);
  if (employee?.statusCode == 401) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
      mailDetail,
      detailData: data,
      history,
      employeeLogin: me,
      master: {
        employee
      },
      finalApproval: getFinalApprover
    }
  };
};

export default withAuth(DetailOutgoingMailInternal, '/outgoing_mail/internal');
