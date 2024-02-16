import React from 'react';
import { SignatureComponentProps, SignatureEnum } from './Signature.types';
import { Container, ContainerLeft } from './Signature.styled';
import styles from './Signature.module.css';
import { Box, Grid, Typography } from '@mui/material';
import Constant from './Signature.constant';
import dayjs from 'dayjs';
import IDN from 'dayjs/locale/id';
import { currencyFormat } from '@/utils/helper';
dayjs.locale(IDN);

// SURAT, SURAT UNDANGAN, NOTA DINAS DAN PERMOHONAN PENAWARAN
const Signature = (props: SignatureComponentProps) => {
  if (props.values?.type == '1') {
    return (
      <>
        <Grid container spacing={2} style={{ marginTop: '20px', marginBottom: '0px', bottom: '270px' }}>
          <Grid item xs={6}></Grid>
          <Grid item xs={5.5}>
            <Container className={styles.text}>
              <Typography style={{ textAlign: 'center', fontWeight: '700', marginBottom: '10px' }}>
                {(props.values?.['Tanda Tangan']?.position || '') +
                  ' ' +
                  (props.values?.['Tanda Tangan']?.department || '')}
              </Typography>
              {props.mailSignature?.['Tanda Tangan']?.qr_url && (
                <img
                  style={{ textAlign: 'center', width: '150px' }}
                  src={props.mailSignature?.['Tanda Tangan']?.qr_url}
                  // alt="approve.png"
                />
              )}
              <Typography style={{ textAlign: 'center', fontWeight: '700', marginTop: '5px' }}>
                {props.values?.['Tanda Tangan']?.name || ''}
              </Typography>
              {props.values?.['Tanda Tangan']?.position_level && props.values?.['Tanda Tangan']?.position_level > 2 && (
                <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
                  {props.values?.['Tanda Tangan']?.NIP
                    ? currencyFormat(props.values?.['Tanda Tangan']?.NIP || '', ' ', 'NIPP. ')
                    : ''}
                </Typography>
              )}
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6.5}></Grid>
        <Grid item xs={5.5}>
          <Container className={styles.text}>
            <Typography style={{ lineHeight: '1.3', marginBottom: '5px', textAlign: 'center', fontWeight: '700' }}>
              {props.values?.['Tanda Tangan']?.position || Constant.Signature?.position}
            </Typography>
            {props.mailSignature?.['Tanda Tangan']?.qr_url && (
              <img
                style={{ textAlign: 'center', width: '150px' }}
                src={props?.mailSignature?.['Tanda Tangan']?.qr_url}
                // alt="approve.png"
              />
            )}
            <Typography style={{ textAlign: 'center', fontWeight: '700', marginTop: '0px' }}>
              {props.values?.['Tanda Tangan']?.name || Constant.Signature.name}
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

// SURAT TUGAS
const SignatureAssignment = (props: SignatureComponentProps) => {
  const tandaTangan = props.values?.['Tanda Tangan'] || undefined;
  if (props.values?.type == '1') {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={6.8}></Grid>
          <Grid item xs={5}>
            <Container className={styles.text}>
              <Typography style={{ textAlign: 'center', fontFamily: 'tahoma', fontWeight: '600' }}>
                {props.values?.diTempat || Constant.Signature.place},{' '}
                {props.values?.letterDate
                  ? dayjs(props.values?.letterDate).format('DD MMMM YYYY')
                  : Constant.Signature.date}
              </Typography>
              <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
                {(tandaTangan?.position || '') +
                  ' ' +
                  ((tandaTangan?.position_level ?? 0) > 2 ? tandaTangan?.department : '')}
              </Typography>
              {props.mailSignature?.['Tanda Tangan']?.qr_url && (
                <img
                  style={{ textAlign: 'center', width: '150px' }}
                  src={props?.mailSignature?.['Tanda Tangan']?.qr_url}
                  // alt="approve.png"
                />
              )}
              <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
                {tandaTangan?.name || Constant.Signature.name}
              </Typography>
              {tandaTangan?.position_level && tandaTangan?.position_level > 2 && (
                <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
                  {tandaTangan?.NIP ? currencyFormat(tandaTangan?.NIP || '', ' ', 'NIPP. ') : ''}
                </Typography>
              )}
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6.8}></Grid>
        <Grid item xs={5}>
          <Container className={styles.text}>
            <Typography style={{ lineHeight: '1.3', textAlign: 'center', fontFamily: 'tahoma', fontWeight: '600' }}>
              {props.values?.diTempat || Constant.Signature.place},{' '}
              {props.values?.letterDate
                ? dayjs(props.values?.letterDate).format('DD MMMM YYYY')
                : Constant.Signature.date}
            </Typography>
            <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
              {(props.values?.['Tanda Tangan']?.department || Constant.Signature.department) + ' PERUMDA TIRTA BENTENG'}
            </Typography>
            <Typography style={{ textAlign: 'center', marginBottom: '5px', fontWeight: '700' }}>
              KOTA {props.values?.diTempat?.toUpperCase() || Constant.Signature?.place}
            </Typography>
            <Typography style={{ lineHeight: '1.3', textAlign: 'center', fontWeight: '700' }}>
              {props.values?.['Tanda Tangan']?.position || Constant.Signature?.position}
            </Typography>
            {props.mailSignature?.['Tanda Tangan']?.qr_url && (
              <img
                style={{ textAlign: 'center', width: '150px' }}
                src={props?.mailSignature?.['Tanda Tangan']?.qr_url}
                // alt="approve.png"
              />
            )}
            <Typography style={{ textAlign: 'center', fontWeight: '700' }}>
              {props.values?.['Tanda Tangan']?.name || Constant.Signature.name}
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

const DoubleSignature = (props: SignatureComponentProps) => {
  return (
    <>
      <Container>
        <Grid item container rowSpacing={4}>
          <Grid item xs={0.5}></Grid>
          <Grid item xs={4}>
            <ContainerLeft className={styles.text}>
              <Typography style={{ textAlign: 'center', fontWeight: '600' }}>Menyetujui:</Typography>

              <Typography style={{ marginBottom: '60px', textAlign: 'center', fontWeight: '600' }}>
                Direktur Teknik
              </Typography>
              <Typography style={{ textAlign: 'center', fontWeight: '600' }}>Joko Surana, ST </Typography>
            </ContainerLeft>
          </Grid>
          <Grid item xs={2.1}></Grid>
          <Grid item xs={5}>
            <Container className={styles.text}>
              <Typography style={{ marginBottom: '75px', textAlign: 'center', fontWeight: '600' }}>
                Manager Sistem Teknologi Informasi
              </Typography>
              <Typography style={{ textAlign: 'center', fontWeight: '600' }}>Dadang Mustika A.ST </Typography>
              <Typography style={{ textAlign: 'center', fontWeight: '600' }}>NIPP: 330 095 104 </Typography>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// PERMOHONAN UANG MUKA KERJA
const SignatureDownPayment = (props: SignatureComponentProps) => {
  const { values } = props;
  return (
    <>
      <Container>
        <Grid item container rowSpacing={3}>
          <Grid item xs={5}>
            <ContainerLeft className={styles.text} style={{ marginTop: '0px' }}>
              {values?.Menyetujui && (
                <>
                  <Typography style={{ textAlign: 'center', fontWeight: '600' }}>Menyetujui:</Typography>
                  <Typography style={{ marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>
                    {values.Menyetujui.position || ''}
                  </Typography>
                  {props.mailSignature?.['Menyetujui']?.qr_url && (
                    <img
                      style={{ textAlign: 'center', width: '150px' }}
                      src={props?.mailSignature?.['Menyetujui']?.qr_url}
                    />
                  )}
                  <Typography style={{ textAlign: 'center', fontWeight: '600', marginTop: '5px' }}>
                    {values.Menyetujui.name || ''}
                  </Typography>
                </>
              )}
            </ContainerLeft>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Container className={styles.text}>
              {values?.['Dibuat Oleh'] && (
                <>
                  <Typography style={{ textAlign: 'center', fontWeight: '600' }}>
                    {values['Dibuat Oleh'].position || ''}{' '}
                  </Typography>
                  <Typography style={{ marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>
                    {values['Dibuat Oleh'].department || ''}
                  </Typography>
                  {props.mailSignature?.['Dibuat Oleh']?.qr_url && (
                    <img
                      style={{ textAlign: 'center', width: '150px' }}
                      src={props?.mailSignature?.['Dibuat Oleh']?.qr_url}
                    />
                  )}
                  <Typography style={{ textAlign: 'center', fontWeight: '600', marginTop: '5px' }}>
                    {values['Dibuat Oleh'].name || ''}{' '}
                  </Typography>
                  {props.values?.['Dibuat Oleh']?.position_level &&
                    props.values?.['Dibuat Oleh']?.position_level > 2 && (
                      <Typography style={{ textAlign: 'center', fontWeight: '600' }}>
                        {props.values?.['Dibuat Oleh']?.NIP
                          ? currencyFormat(props.values?.['Dibuat Oleh']?.NIP || '', ' ', 'NIPP. ')
                          : ''}
                      </Typography>
                    )}
                </>
              )}
            </Container>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}></Grid>
        </Grid>
      </Container>
    </>
  );
};

// PERINTAH PPERJALANAN DINAS
const SignatureTravel = (props: SignatureComponentProps) => {
  const { values } = props;
  return (
    <>
      <Grid container style={{ marginBottom: '15px', marginTop: '30px' }}>
        <Grid item xs={8} />
        <Grid item xs={1.7} style={{ fontSize: '0.9rem', fontFamily: 'Tahoma', fontWeight: 400 }}>
          Dikeluarkan di
        </Grid>
        <Grid item xs={2} style={{ fontSize: '0.9rem', fontFamily: 'Tahoma', fontWeight: 400 }}>
          {`: ${values?.diTempat || 'Tangerang'}`}
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={1.7} style={{ fontSize: '0.9rem', fontFamily: 'Tahoma', fontWeight: 400 }}>
          Pada Tanggal
        </Grid>
        <Grid item xs={2} style={{ fontSize: '0.9rem', fontFamily: 'Tahoma', fontWeight: 400 }}>
          {`: ${values?.letterDate ? dayjs(values.letterDate).format('DD MMMM YYYY') : ''}`}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Container className={styles.text}>
        <Grid container>
          <Grid item xs={7}></Grid>
          <Grid item xs={5}>
            <Typography style={{ marginBottom: '60px', fontWeight: '700' }}>
              {values?.['Tanda Tangan']?.position || ''}
            </Typography>
            {props.mailSignature?.['Tanda Tangan']?.qr_url && (
              <img
                style={{ textAlign: 'center', width: '150px' }}
                src={props?.mailSignature?.['Tanda Tangan']?.qr_url}
              />
            )}
            <Typography style={{ fontWeight: '700' }}>{values?.['Tanda Tangan']?.name || ''}</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// DAFTAR KEBUTUHAN BARANG
const SignatureGoodsRequirements = (props: SignatureComponentProps) => {
  return (
    <>
      <Grid item container style={{ fontSize: '151px' }}>
        <Grid item xs={6}>
          <ContainerLeft className={styles.text}>
            {props.values?.['Menyetujui'] && (
              <Typography style={{ marginTop: '33px', textAlign: 'center', fontWeight: '600' }}>Menyetujui:</Typography>
            )}
            <Typography style={{ marginBottom: '-40px', textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Menyetujui']?.position || ''}
            </Typography>
            {!props.mailSignature?.['Menyetujui']?.qr_url ? (
              ''
            ) : (
              <Box style={{ marginBottom: '-65px' }}>
                {props.mailSignature?.['Menyetujui']?.qr_url && (
                  <img
                    style={{
                      textAlign: 'center',
                      width: '150px',
                      alignItems: 'center',
                      marginBottom: '-35px'
                    }}
                    src={props?.mailSignature?.['Menyetujui']?.qr_url}
                    // alt="approve.png"
                  />
                )}
              </Box>
            )}
            <Typography
              style={{ textDecoration: 'underline', textAlign: 'center', fontWeight: '600', marginTop: '50px' }}
            >
              {props.values?.['Menyetujui']?.name || ''}{' '}
            </Typography>
          </ContainerLeft>
        </Grid>
        <Grid item xs={6}>
          <Container className={styles.text}>
            <Typography style={{ textAlign: 'center', fontFamily: 'tahoma', fontWeight: '600' }}>
              {props.values?.diTempat || Constant.Signature.place},{' '}
              {props.values?.letterDate
                ? dayjs(props.values?.letterDate).format('DD MMMM YYYY')
                : Constant.Signature.date}
            </Typography>
            {props.values?.['Dibuat Oleh'] && (
              <Typography style={{ textAlign: 'center', fontWeight: '600' }}>Dibuat :</Typography>
            )}
            <Typography style={{ textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Dibuat Oleh']?.position || ''}
            </Typography>
            <Typography style={{ textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Dibuat Oleh']?.department || ''}
            </Typography>
            {props.mailSignature?.['Dibuat Oleh']?.qr_url && (
              <Box style={{ marginBottom: '-75px' }}>
                <img
                  style={{
                    textAlign: 'center',
                    width: '150px',
                    alignItems: 'center',
                    margin: '10px 0px 15px 0px'
                  }}
                  src={props?.mailSignature?.['Dibuat Oleh']?.qr_url}
                  // alt="approve.png"
                />
              </Box>
            )}
            <Typography
              style={{ textAlign: 'center', textDecoration: 'underline', fontWeight: '600', marginTop: '10px' }}
            >
              {props.values?.['Dibuat Oleh']?.name || ''}{' '}
            </Typography>
            {props.values?.['Dibuat Oleh']?.position_level && props.values?.['Dibuat Oleh']?.position_level > 2 && (
              <Typography style={{ textAlign: 'center', fontWeight: '600', marginTop: '0px' }}>
                {props.values?.['Dibuat Oleh']?.NIP
                  ? currencyFormat(props.values?.['Dibuat Oleh']?.NIP || '', ' ', 'NIPP. ')
                  : ''}
              </Typography>
            )}
          </Container>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={12}>
          <Container className={styles.text}>
            {props.values?.['Mengetahui & Menyetujui'] && (
              <Typography style={{ textAlign: 'center', fontWeight: '600', marginTop: '20px' }}>
                Mengetahui & Menyetujui :
              </Typography>
            )}
            <Typography style={{ marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Mengetahui & Menyetujui']?.position || ''}
            </Typography>
            {props.mailSignature?.['Mengetahui & Menyetujui']?.qr_url && (
              <img
                style={{ textAlign: 'center', width: '150px', marginBottom: '5px' }}
                src={props?.mailSignature?.['Mengetahui & Menyetujui']?.qr_url}
                // alt="approve.png"
              />
            )}
            <Typography style={{ textDecoration: 'underline', textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Mengetahui & Menyetujui']?.name || ''}
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <Grid container style={{ marginLeft: '40px', marginTop: '100px' }}>
        <Grid item xs={2}>
          <Typography style={{ fontSize: '0.9rem', fontFamily: 'Tahoma' }}>Diterima</Typography>
        </Grid>
        <Grid item xs={10}>
          :
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: '0.9rem', fontFamily: 'Tahoma' }}>Tanggal</Typography>
        </Grid>
        <Grid item xs={10}>
          :
        </Grid>
        <Typography style={{ fontWeight: '750' }}>. . . . . . . . . . . . .</Typography>
        <Typography style={{ fontSize: '0.9rem', fontFamily: 'Tahoma' }}>NIPP.</Typography>
      </Grid>
    </>
  );
};

const SignaturePurchaseOrder = (props: SignatureComponentProps) => {
  return (
    <>
      <Grid item container style={{ fontSize: '151px' }}>
        <Grid item xs={6}>
          <ContainerLeft className={styles.text}>
            {props.values?.['Menyetujui'] && (
              <Typography style={{ marginTop: '33px', textAlign: 'center', fontWeight: '600' }}>Menyetujui:</Typography>
            )}
            <Typography style={{ marginBottom: '-40px', textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Menyetujui']?.position || ''}
            </Typography>
            {!props.mailSignature?.['Menyetujui']?.qr_url ? (
              ''
            ) : (
              <Box style={{ marginBottom: '-65px' }}>
                {props.mailSignature?.['Menyetujui']?.qr_url && (
                  <img
                    style={{
                      textAlign: 'center',
                      width: '150px',
                      alignItems: 'center',
                      marginBottom: '-35px'
                    }}
                    src={props?.mailSignature?.['Menyetujui']?.qr_url}
                    // alt="approve.png"
                  />
                )}
              </Box>
            )}
            <Typography
              style={{ textDecoration: 'underline', textAlign: 'center', fontWeight: '600', marginTop: '50px' }}
            >
              {props.values?.['Menyetujui']?.name || ''}{' '}
            </Typography>
          </ContainerLeft>
        </Grid>
        <Grid item xs={6}>
          <Container className={styles.text}>
            <Typography style={{ textAlign: 'center', fontFamily: 'tahoma', fontWeight: '600' }}>
              {props.values?.diTempat || Constant.Signature.place},{' '}
              {props.values?.letterDate
                ? dayjs(props.values?.letterDate).format('DD MMMM YYYY')
                : Constant.Signature.date}
            </Typography>
            {props.values?.['Dibuat Oleh'] && (
              <Typography style={{ textAlign: 'center', fontWeight: '600' }}>Dibuat :</Typography>
            )}
            <Typography style={{ textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Dibuat Oleh']?.position || ''}
            </Typography>
            <Typography style={{ textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Dibuat Oleh']?.department || ''}
            </Typography>
            {props.mailSignature?.['Dibuat Oleh']?.qr_url && (
              <Box style={{ marginBottom: '-75px' }}>
                <img
                  style={{
                    textAlign: 'center',
                    width: '150px',
                    alignItems: 'center',
                    margin: '10px 0px 15px 0px'
                  }}
                  src={props?.mailSignature?.['Dibuat Oleh']?.qr_url}
                  // alt="approve.png"
                />
              </Box>
            )}
            <Typography
              style={{ textAlign: 'center', textDecoration: 'underline', fontWeight: '600', marginTop: '10px' }}
            >
              {props.values?.['Dibuat Oleh']?.name || ''}{' '}
            </Typography>
            {props.values?.['Dibuat Oleh']?.position_level && props.values?.['Dibuat Oleh']?.position_level > 2 && (
              <Typography style={{ textAlign: 'center', fontWeight: '600', marginTop: '0px' }}>
                {props.values?.['Dibuat Oleh']?.NIP
                  ? currencyFormat(props.values?.['Dibuat Oleh']?.NIP || '', ' ', 'NIPP. ')
                  : ''}
              </Typography>
            )}
          </Container>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={12}>
          <Container className={styles.text}>
            {props.values?.['Mengetahui & Menyetujui'] && (
              <Typography style={{ textAlign: 'center', fontWeight: '600', marginTop: '20px' }}>
                Mengetahui & Menyetujui :
              </Typography>
            )}
            <Typography style={{ marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Mengetahui & Menyetujui']?.position || ''}
            </Typography>
            {props.mailSignature?.['Mengetahui & Menyetujui']?.qr_url && (
              <img
                style={{ textAlign: 'center', width: '150px', marginBottom: '5px' }}
                src={props?.mailSignature?.['Mengetahui & Menyetujui']?.qr_url}
                // alt="approve.png"
              />
            )}
            <Typography style={{ textDecoration: 'underline', textAlign: 'center', fontWeight: '600' }}>
              {props.values?.['Mengetahui & Menyetujui']?.name || ''}
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

const Default = () => {
  return <></>;
};

const SIGNATURE: Record<SignatureEnum, (props: SignatureComponentProps) => React.ReactNode> = {
  [SignatureEnum.SignatureAssignment]: props => <SignatureAssignment {...props} />,
  [SignatureEnum.Signature]: props => <Signature {...props} />,
  [SignatureEnum.SignatureDownPayment]: props => <SignatureDownPayment {...props} />,
  [SignatureEnum.DoubleSignature]: props => <DoubleSignature {...props} />,
  [SignatureEnum.SignatureGoodsRequirements]: props => <SignatureGoodsRequirements {...props} />,
  [SignatureEnum.SignatureTravel]: props => <SignatureTravel {...props} />,
  [SignatureEnum.SignaturePurchaseOrder]: props => <SignaturePurchaseOrder {...props} />,
  [SignatureEnum.Default]: props => <Default />
};

const SignatureComponent: React.FC<SignatureComponentProps> = props => {
  const selectedEnumValue: SignatureEnum = props.code ? SignatureEnum[props.code] : SignatureEnum.Default;

  const selectedComponent = SIGNATURE[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default SignatureComponent;
