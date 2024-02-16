//react & next
import React, { useContext, useEffect } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

//component
import LayoutComponent from '@/components/Layout/Layout';
import { StoreContext } from '@/context/context';
import useCustomFormik from '@/hooks/useCustomFormik';
import { Field, FormikProvider, Form as FormikForm, useFormik } from 'formik';
import TextField from '@/components/Form/TextField';
import Switch from '@/components/FormControlled/Formik/Switch';
import IncomingMailFormDispositionOutgoing from '@/pageComponents/IncomingMail/FormDispositionOutgoing';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';
import PrintPdf from '@/pageComponents/OutgoingMail/pdf';

//mui icons-material
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  Person,
  LockClock,
  Description as DescriptionIcon,
  FileCopy
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import EventIcon from '@mui/icons-material/Event';

//mui lab
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

//mui material
import {
  Alert,
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
  Snackbar,
  Stack
} from '@mui/material';

//utils & etc
import dayjs from 'dayjs';
import * as yup from 'yup';
import withAuth from '@/hocs/withAuth';

//lib helper
import { getLoginSession } from '@/lib/auth';
import { sessionService } from '@/lib/services';
import { IAccess, mailService } from '@/lib/services';
import { http } from '@/utils/httpClient';
import { dispositionSchema2 } from '@/lib/validation';
import DispositionMail from '@/pageComponents/DispositionMail/Form';

interface DetailOutgoingMailProps {
  detailData: {
    mailIncomingId: number;
    mailOutgoingId: number;
    doc_no: string;
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

const DetailDisposition = (props: DetailOutgoingMailProps) => {
  const router = useRouter();
  const { state, actions } = useContext(StoreContext);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openDialogApprove, setDialogApprove] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [historyData, setHistoryData] = React.useState<any>(props.history);

  const fetchHistory = async () => {
    try {
      const response = await http.get(
        `/api/mail/history?history=${
          props.detailData.mailIncomingId ? props.detailData.mailIncomingId : props.detailData.mailOutgoingId
        }&type=${props.detailData.mailIncomingId ? 1 : 2}`
      );
      // Handle the fetched history data here, e.g., update state or perform actions
      return response.data; // Return the fetched data if needed
    } catch (error) {
      throw error; // Throw the error or handle it as required
    }
  };

  const createDisposition = async (values: any) => {
    let response;
    if (props.detailData?.mailOutgoingId) {
      response = await http.post('/api/mail/outcoming_disposition', values);
    } else {
      response = await http.post('/api/mail/incoming_disposition', values);
    }
    if (response.status == 200 || response.status == 201) {
      const updatedHistory = await fetchHistory();
      actions.UPDATE_DIALOG({
        ...state.dialog,
        show: true,
        image: '/images/success.png',
        content: 'Disposisi Berhasil',
        title: 'Sukses',
        type: 'success',
        onClose: () => {
          setHistoryData(updatedHistory);
          handleCloseDialog();
        }
      });
    }
    // else {
    //   actions.UPDATE_DIALOG({
    //     ...state.dialog,
    //     show: true,
    //     image: '/images/error.png',
    //     content: (error as Error).message || 'Terjadi Kesalahan',
    //     title: 'Error',
    //     type: 'error'
    //   });
    // }
  };

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      mailIncomingId: props.detailData?.mailIncomingId || null,
      mailOutgoingId: props.detailData?.mailOutgoingId || null,
      doc_no: props.detailData?.doc_no,
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
      formik.resetForm();
    }
  });

  const updateDisposition = async () => {
    const data = {
      mailId: props.detailData?.mailIncomingId ? props.detailData?.mailIncomingId : props.detailData?.mailOutgoingId,
      type: props.detailData?.mailIncomingId ? 1 : 2
    };
    const response = await http.post('/api/mail/updateDisposition', data);
    const updatedHistory = await fetchHistory();
    setHistoryData(updatedHistory);
  };

  useEffect(() => {
    updateDisposition();
  }, []);

  const mappingEmployee = props.master.employee
    ?.filter((a: any) => a.value !== props.employeeLogin?.id)
    .map((a: any) => ({ value: a.value, label: a.label }));

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRedirect = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  return (
    <React.Fragment>
      <Head>
        <title>Detail Disposisi</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 title="Detail Disposisi" className="align-month main-title">
                Detail Disposisi
              </h2>
            </Box>
            <Stack direction="row" spacing={1}>
              {props.session.m_disposition == 1 && (
                <Button className="btn-primary" variant="contained" onClick={handleClickOpenDialog}>
                  Disposisi Surat
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
                          <TagOutlinedIcon sx={{ color: '#A9B2BF' }}></TagOutlinedIcon>
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
                          <EventIcon sx={{ color: '#A9B2BF' }}></EventIcon>
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
                          <MailOutlineIcon sx={{ color: '#A9B2BF' }}></MailOutlineIcon>
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
                          props.mailDetail?.createdMail.res?.[0].NIP +
                          ' - ' +
                          props.mailDetail?.createdMail.res?.[0].name
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
                <CloseIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
              </IconButton>
            </Stack>
            <FormikProvider value={formik}>
              <FormikForm>
                <DispositionMail
                  isSubmitting={formik.isSubmitting}
                  isValid={formik.isValid}
                  dirty={formik.dirty}
                  values={formik.values}
                  handleClose={handleRedirect}
                  employee={mappingEmployee}
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
  const id = data.mailIncomingId ? data.mailIncomingId : data.mailOutgoingId;
  const session = await getLoginSession(ctx.req as NextApiRequest);
  let mailDetail;
  let history;
  const employee = await mailService.getDispositionEmployee(session?.session as string, 2);
  if (data.mailOutgoingId) {
    history = await mailService.getHistory(session?.session as string, id, 2);
    mailDetail = await mailService.getDetailOutgoingMail(session?.session as string, data.mailOutgoingId);
  } else {
    history = await mailService.getHistory(session?.session as string, id, 1);
    mailDetail = await mailService.getDetailIncomingMail(session?.session as string, data.mailIncomingId);
  }
  const me = await sessionService.getSessionProfile(session?.session as string);
  //   const getFinalApprover = await mailService.getValidationPosition(session?.session as string, id);
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
      }
      //   finalApproval: getFinalApprover
    }
  };
};

export default withAuth(DetailDisposition, '/disposition');
