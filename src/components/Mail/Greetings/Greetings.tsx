import React, { useEffect } from 'react';
import { GreetingsComponentProps, GreetingsEnum } from './Greetings.types';
import { Container, Item, Item2 } from './Greetings.styled';
import styles from './Greetings.module.css';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Constant from './Greetings.constant';
import dayjs from 'dayjs';
import IDN from 'dayjs/locale/id';
import { currencyFormat } from '@/utils/helper';
import ReactHtmlParser from 'react-html-parser';
dayjs.locale(IDN);

// SURAT TUGAS
const Assignment = (props: GreetingsComponentProps) => {
  return (
    <Container className={styles.text} style={{ fontSize: '10px' }}>
      <Grid style={{ height: '0px' }} rowGap={0.1} rowSpacing={1} container item xs={12}>
        <Grid item={true} xs={2.4}>
          <Item>Dasar Penugasan</Item>
        </Grid>
        <Grid item xs={9.6}>
          <Item>: {props.values?.['Dasar Penugasan'] || ''}</Item>
        </Grid>
        <Grid item xs={2.6} />
        <Grid container item xs={9.4}>
          <Grid item xs={2}>
            <Item>Tanggal</Item>
          </Grid>
          <Grid item xs={10}>
            <Item>: {props.values?.Tanggal ? dayjs(props.values?.Tanggal).format('DD MMMM YYYY') : ''}</Item>
          </Grid>
          {/* Nomor */}
          <Grid item xs={2}>
            <Item>Nomor</Item>
          </Grid>
          <Grid item xs={10}>
            <Item>: {props.values?.['Nomor Referensi'] || '-'}</Item>
          </Grid>
          {/* Perihal */}
          <Grid item xs={2}>
            <Item>Perihal</Item>
          </Grid>
          <Grid item xs={10}>
            <Item>: {props.values?.subject || ''}</Item>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const Greetings = (props: GreetingsComponentProps) => {
  return (
    <Container className={styles.text}>
      <Item>Yth. Bapak Dadang,</Item>
      <Item>Jalan Saharjo No.151,</Item>
      <Item>Jakarta Selatan.</Item>
    </Container>
  );
};

// NOTA DINAS
const OfficialMemo = (props: GreetingsComponentProps) => {
  const { formik, values } = props;
  const toGroup: string[] = [];
  props.values?.toGroup?.map(item => {
    toGroup.push(item.headPosition + ' ' + item.label + ' ' + item.company);
  });

  useEffect(() => {
    if (!values?.Dari) {
      formik?.setFieldValue(
        'opener.value.Dari',
        formik.values.user?.headPosition + ' ' + formik.values.user?.department
      );
    }
  }, []);

  return (
    <>
      <Container>
        <Grid container item xs={12} style={{ fontSize: '0.8rem', fontFamily: 'Tahoma', marginTop: '20px' }}>
          <Grid item xs={2}>
            Kepada Yth.
          </Grid>
          <Grid item xs={0.55}>
            :
          </Grid>
          <Grid item xs={9} style={{ marginLeft: '-20px' }}>
            <Item>{values?.type == '1' ? toGroup.join(',') : values?.type == '2' ? values?.addressedTo : ''}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Dari</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {values?.['Dari'] || values?.Dari} </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Nomor</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {values?.docNo || ''}</Item>
          </Grid>

          <Grid item xs={2}>
            <Item>Tanggal</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>
              : {values?.letterDate ? dayjs(values?.letterDate).format('DD MMMM YYYY') : Constant.OfficialMemo.date}
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Lampiran</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {values?.attachmentLength?.label || '-'}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Perihal</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {values?.subject || ''}</Item>
          </Grid>
        </Grid>
        <Grid style={{ width: '100%' }}>
          <Stack spacing={0.5}>
            <Divider style={{ borderColor: 'black' }} />
            <Divider style={{ borderColor: 'black', borderWidth: 'medium' }} />
          </Stack>
        </Grid>
      </Container>
    </>
  );
};

// PERMOHONAN UANG MUKA KERJA
const DownPayment = (props: GreetingsComponentProps) => {
  const { formik, values } = props;
  useEffect(() => {
    if (!values?.Dari) {
      formik?.setFieldValue(
        'opener.value.Permohonan Dari',
        formik.values.user?.headPosition + ' ' + formik.values.user?.department
      );
    }
  }, []);

  return (
    <>
      <Container>
        <Grid container item xs={12} style={{ fontSize: '0.7rem', fontFamily: 'Tahoma' }}>
          {/* From */}
          <Grid item xs={3}>
            <Item>Permohonan Dari</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {props.values?.['Permohonan Dari'] || ''}</Item>
          </Grid>
          {/* Jumlah */}
          <Grid item xs={3}>
            <Item>Sejumlah</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {props.values?.['Sejumlah'] ? currencyFormat(props.values?.['Sejumlah'], '.', 'Rp. ') : '-'}</Item>
          </Grid>
          {/* Keperluan */}
          <Grid item xs={3}>
            <Item>Untuk Keperluan</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {props.values?.['Untuk Keperluan'] || ''}</Item>
          </Grid>
          {/* Kode Perkiraan */}
          <Grid item xs={3}>
            <Item>Kode Perkiraan</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {props.values?.['Kode Perkiraan'] || ''}</Item>
          </Grid>
          {/* Nama Perkiraan */}
          <Grid item xs={3}>
            <Item>Nama Perkiraan</Item>
          </Grid>
          <Grid item xs={9}>
            <Item>: {props.values?.['Nama Perkiraan'] || ''}</Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// PERJALANAN DINAS
const OfficialTravel = (props: GreetingsComponentProps) => {
  const { values } = props;
  return (
    <>
      <Container className={styles.travel} style={{ maxHeight: '0px' }}>
        <Typography style={{ marginLeft: '20px', fontWeight: 800, marginTop: '-45px', maxHeight: '20px' }}>
          {values?.Judul || ''}
        </Typography>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography style={{ textAlign: 'center', marginTop: '-5px' }}>{`Nomor : ${
              values?.docNo || ''
            }`}</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

//Surat Order Pembelian
const PurchaseOrder = (props: GreetingsComponentProps) => {
  const { values } = props;
  return (
    <>
      <Container className={styles.travel} style={{ maxHeight: '0px' }}>
        <Typography style={{ marginLeft: '20px', fontWeight: 800, marginTop: '-45px', maxHeight: '20px' }}>
          ORDER PEMBELIAN (OP)
        </Typography>
        <Grid container item xs={12}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Typography
              style={{
                textAlign: 'center',
                marginTop: '-5px'
              }}
            >{`Nomor : ${values?.docNo || ''}`}</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// DAFTAR KEBUTUHAN BARANG
const GoodsRequirements = (props: GreetingsComponentProps) => {
  const { values } = props;
  return (
    <>
      <Container>
        <Grid container item xs={12} style={{ marginTop: '-45px' }}>
          <Grid item xs={12}>
            <Typography
              style={{
                textAlign: 'center',
                marginLeft: '20px',
                fontFamily: 'Tahoma',
                fontWeight: '400',
                fontSize: '0.9rem'
              }}
            >
              {values?.Judul || ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{
                textAlign: 'center',
                marginLeft: '20px',
                fontFamily: 'Tahoma',
                fontWeight: '400',
                fontSize: '0.9rem'
              }}
            >
              {`No: ${values?.docNo || ''}`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// SURAT, PERMOHONAN PENAWARAN DAN SURAT UNDANGAN
const Invitation = (props: GreetingsComponentProps) => {
  const { values } = props;
  const toGroup: string[] = [];
  values?.toGroup?.map(item => {
    toGroup.push(`${item.headPosition} ${item.label}`);
  });

  return (
    <Container style={{ marginTop: '40px' }}>
      <Grid container item xs={12}>
        <Grid container item xs={7.7} style={{ maxHeight: '85px' }}>
          <Grid item xs={2}>
            <Item>Sifat</Item>
          </Grid>
          <Grid item xs={9.7}>
            <Item>: {values?.['Sifat'] || Constant.Invitation.sifat}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Derajat</Item>
          </Grid>
          <Grid item xs={9.7}>
            <Item>: {values?.['Derajat'] || Constant.Invitation.derajat}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Nomor</Item>
          </Grid>
          <Grid item xs={9.7}>
            <Item>: {values?.docNo || ''}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Lampiran</Item>
          </Grid>
          <Grid item xs={9.7}>
            <Item>: {values?.attachmentLength?.label || '-'}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>Perihal</Item>
          </Grid>
          <Grid container xs={9}>
            <Grid item xs={0.3}>
              <Item2>:</Item2>
            </Grid>
            <Grid item xs={11.5}>
              <Item2>
                <strong style={{ fontStyle: 'italic' }}>
                  {' '}
                  {values?.subject || Constant.Invitation.subjectUndangan}
                </strong>
              </Item2>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4.3}>
          <Grid item xs={12}>
            <Item2 style={{ marginTop: '-33px', marginBottom: '20px' }}>
              {props?.values?.diTempat ? props?.values?.diTempat : Constant.Invitation.place}, {''}
              {values?.letterDate ? dayjs(values?.letterDate).format('DD MMMM YYYY') : Constant.Invitation.date}
            </Item2>
            <Item2 style={{ marginTop: '0px', marginBottom: '10px' }}>Kepada Yth:</Item2>
            <Item style={{ marginBottom: '10px', fontWeight: '600', width: '210px' }}>
              {values?.type == '1' ? (
                toGroup.join(',')
              ) : values?.type == '2' ? (
                <>{ReactHtmlParser(values?.addressedTo || '')}</>
              ) : (
                '-'
              )}
            </Item>
            <Item2>Di -</Item2>
            <Item2 style={{ marginLeft: '3vh', fontWeight: '600' }}>Tempat</Item2>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const Default = () => {
  return <></>;
};

const GREETING: Record<GreetingsEnum, (props: GreetingsComponentProps) => React.ReactNode> = {
  [GreetingsEnum.Assignment]: props => <Assignment {...props} />,
  [GreetingsEnum.Greetings]: props => <Greetings {...props} />,
  [GreetingsEnum.OfficialMemo]: props => <OfficialMemo {...props} />,
  [GreetingsEnum.DownPayment]: props => <DownPayment {...props} />,
  [GreetingsEnum.OfficialTravel]: props => <OfficialTravel {...props} />,
  [GreetingsEnum.PurchaseOrder]: props => <PurchaseOrder {...props} />,
  [GreetingsEnum.GoodsRequirements]: props => <GoodsRequirements {...props} />,
  [GreetingsEnum.Invitation]: props => <Invitation {...props} />,
  [GreetingsEnum.Default]: props => <Default />
};

const GreetingsComponent: React.FC<GreetingsComponentProps> = props => {
  const selectedEnumValue: GreetingsEnum = props.code ? GreetingsEnum[props.code] : GreetingsEnum.Default;

  const selectedComponent = GREETING[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default GreetingsComponent;
