import React, { useEffect, useContext, useCallback } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';
import LayoutComponent from '@/components/Layout/Layout';
import { StoreContext } from '@/context/context';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import EventIcon from '@mui/icons-material/Event';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CloseIcon from '@mui/icons-material/Close';
import { http } from '@/utils/httpClient';
import useCustomFormik from '@/hooks/useCustomFormik';
import { FormikProvider, Form as FormikForm } from 'formik';
import { dispositionSchema2 } from '@/lib/validation';
import dayjs from 'dayjs';
import { mutate } from 'swr';
import IncomingMailFormDisposition from '@/pageComponents/IncomingMail/FormDisposition';
import {
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
import withAuth from '@/hocs/withAuth';
import { getLoginSession } from '@/lib/auth';
import { IAccess, mailService, sessionService } from '@/lib/services';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';
import Preview from '@/pageComponents/IncomingMail/Preview';
import { FileCopy, LockClock, Person } from '@mui/icons-material';
import Link from 'next/link';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';

interface DetailIncomingMailProps {
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
  employeeLogin: any;
  createdMail: any;
  session: IAccess;
}

const DetailIncomingMail: React.FC<DetailIncomingMailProps> = props => {
  const { state, actions } = useContext(StoreContext);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [historyData, setHistoryData] = React.useState<any>(props.history);

  const fetchHistory = async () => {
    try {
      const response = await http.get(`/api/mail/history?history=${props.detailData.id}&type=${1}`);
      // Handle the fetched history data here, e.g., update state or perform actions
      return response.data; // Return the fetched data if needed
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error; // Throw the error or handle it as required
    }
  };

  const createDisposition = async (values: any) => {
    try {
      const response = await http.post('/api/mail/incoming_disposition', values);
      if (response.status == 200 || response.status == 201) {
        mutate(`/api/mail/history?history=${props.detailData.id}&type=${1}`);
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      // id: dataDisposition?.id || '',
      mailIncomingId: props.detailData?.id,
      doc_no: props.mailDetail?.doc_no,
      doc_date: props.mailDetail?.doc_date,
      status: props.mailDetail?.status,
      subject: props.mailDetail?.subject,
      input_date: props.mailDetail?.created_at,
      employee: null,
      notes: '',
      date: dayjs().format('YYYY-MM-DD')
    },
    validationSchema: dispositionSchema2,

    onSubmit: values => {
      createDisposition(values);
      handleResetForm();
    }
  });

  const handleResetForm = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const updateStatus = useCallback(async () => {
    const data = {
      mailId: props.detailData.id,
      type: 1
    };
    await http.post('/api/mail/updateDisposition', data);
    (!props.detailData?.is_read || props.detailData.is_read == 0) &&
      (await http.post('/api/mail/updateIsRead', { mailId: props.detailData.id, type: 'inbox' }));

    const updatedHistory = await fetchHistory();
    setHistoryData(updatedHistory);
    mutate(`/api/mail/history?history=${props.detailData.id}&type=${1}`);
  }, [props.detailData]);

  useEffect(() => {
    updateStatus();
  }, []);

  const handleRedirect = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const mappingEmployee = props.master.employee
    ?.filter((a: any) => a.value !== props.employeeLogin?.id)
    .map((a: any) => ({ value: a.value, label: a.label }));

  return (
    <React.Fragment>
      <Head>
        <title>Detail Surat Masuk Internal</title>
      </Head>
      <LayoutComponent>
        <>
          <Stack className="main-title-row" direction="row" justifyContent="space-between">
            <Box className="head-moment-sub">
              <h2 title="TEST" className="align-month main-title">
                Detail Surat Masuk - Internal
              </h2>
            </Box>
            {props.session.m_disposition ? (
              <Stack direction="row" spacing={1}>
                <Button className="btn-primary" variant="contained" onClick={handleClickOpenDialog}>
                  Disposisi Surat
                </Button>
              </Stack>
            ) : null}
          </Stack>
          <Box sx={{ flexGrow: 1, maxHeight: '10%' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
              <Grid item xs={2} sm={12} md={8.5}>
                <Preview
                  type={props.mailDetail?.mailAttachment.length > 0 ? 'attachment' : 'mail'}
                  mailDetail={props.mailDetail}
                  detailData={props.detailData}
                  history={historyData}
                  master={props.master}
                />
              </Grid>
              <Grid item xs={2} sm={12} md={3.5}>
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
                            <Person sx={{ color: '#A9B2BF' }}></Person>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Pembuat Surat"
                          secondary={
                            props.mailDetail?.createdMail.res?.[0]?.NIP +
                              ' - ' +
                              props.mailDetail?.createdMail.res?.[0]?.name || '-'
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
                          secondary={dayjs(props.mailDetail?.createdMail.date).format('YYYY-MM-DD HH:mm:ss')}
                        />
                      </ListItem>
                      {props.mailDetail?.mailAttachmentOutgoing?.map((item: any, i: number) => (
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
                      {historyData.map((item: any, index: number) => (
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
                </Stack>
              </Grid>
            </Grid>
          </Box>

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
                <IncomingMailFormDisposition
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
  const query: any = ctx.query;
  const data = JSON.parse(Buffer.from(query.type, 'base64').toString('ascii'));
  const session = await getLoginSession(ctx.req as NextApiRequest);

  const employee = await mailService.getDispositionEmployee(session?.session as string, 1);
  let history = await mailService.getHistory(session?.session as string, data.id, 1);
  const mailDetail = await mailService.getDetailIncomingMail(session?.session as string, data.id);

  const me = await sessionService.getSessionProfile(session?.session as string);

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
      master: {
        employee
      },
      employeeLogin: me
    }
  };
};

export default withAuth(DetailIncomingMail, '/incoming_mail/internal');
