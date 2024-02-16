import React from 'react';
import { Dialog, DialogTitle, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { AuthPageBackground, AuthPageContainer as PageContainer } from '@/components/Container/Container.styled';
import Image from 'next/image';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { mailService } from '@/lib/services';

interface SignaturePageProps {
  mailData: {
    docNo: string;
    docDate: string;
    approver: string[];
  };
}

const Signature: React.FC<SignaturePageProps> = props => {
  const [datas, setDatas] = React.useState<any>();

  return (
    <>
      <React.Fragment>
        <>
          <PageContainer>
            <AuthPageBackground>
              <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
              >
                <defs>
                  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                  <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                  <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                  <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                  <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
              </svg>
            </AuthPageBackground>
            <Dialog
              open={true}
              fullWidth={true}
              maxWidth={'xs'}
              slotProps={{
                backdrop: {
                  sx: {
                    //Your style here....
                    backgroundColor: '#00000020'
                  }
                }
              }}
              PaperProps={{ sx: { borderRadius: '20px', maxWidth: 420, padding: '25px 25px', background: '#FFF' } }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Image src={'/images/logo.png'} alt="Logo Image" height={28} width={40.83} priority />
                <Typography sx={{ fontWeight: '600', fontSize: '11px', color: '#536580' }}>
                  E-Office Web App
                  <Typography component="span" sx={{ fontSize: '11px' }}>
                    {' '}
                    Tirta Benteng
                  </Typography>
                </Typography>
              </Stack>
              <Stack
                direction="column"
                spacing={0.25}
                sx={{ margin: '40px 0 10px' }}
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={props.mailData.docNo ? '/images/success.png' : '/images/ask.png'}
                  alt="success"
                  height={171}
                  width={151}
                  priority
                />
                <DialogTitle sx={{ padding: '0', fontSize: '20px', color: '#536580' }}>
                  {props.mailData.docNo ? 'Surat Terverifikasi' : 'Surat Tidak Terverifikasi'}
                </DialogTitle>
              </Stack>
              <List className="info-list" style={{ width: '100%', padding: '15px 0px 0px' }}>
                <ListItem sx={{ padding: '10px 0 ' }}>
                  <ListItemText
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                    primary="Nomor Surat"
                    secondary={props.mailData.docNo ? props.mailData.docNo : '-'}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ padding: '10px 0 ' }}>
                  <ListItemText
                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                    primary="Tanggal Surat"
                    secondary={props.mailData.docNo ? dayjs(props.mailData.docDate).format('DD MMMM YYYY') : '-'}
                  />
                </ListItem>
                <Divider />
                <ListItem sx={{ padding: '10px 0 ' }}>
                  <ListItemText
                    sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, justifyContent: 'space-between' }}
                    primary="Disetujui oleh"
                    // secondary={props.mailData.docNo ? props.mailData.approver.join(',') : '-'}
                    secondary={
                      <React.Fragment>
                        <List>
                          {props.mailData.approver?.map((item, i) => {
                            return (
                              <ListItem key={item} sx={{ padding: '0 10px' }}>
                                <ListItemText secondary={`${i + 1}. ${item}`} />
                              </ListItem>
                            );
                          })}
                        </List>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
              <span style={{ marginTop: 10, fontSize: '9px', fontStyle: 'italic', color: '#A5AEBC' }}>
                Dokumen ini dikeluarkan dari Sistem Informasi Dokumen Elektronik dan dinyatakan sah tanpa dibubuhi tanda
                tangan basah sesuai Peraturan Direksi Nomor : 1.2/PER-AM/HUK/I/2024 tanggal 5 Januari 2024.
              </span>
            </Dialog>
          </PageContainer>
        </>
      </React.Fragment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const mailData = await mailService.mailSignature((ctx.query.signature as string) || '');

  return {
    props: {
      mailData
    }
  };
};

export default Signature;
