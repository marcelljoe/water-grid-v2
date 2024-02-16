import React from 'react';
import { HeaderComponentProps, HeaderEnum } from './Header.types';
import { Container } from './Header.styled';
import styles from './Header.module.css';
import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import Constant from './Header.constant';
import dayjs from 'dayjs';
import IDN from 'dayjs/locale/id';
dayjs.locale(IDN);

const HeaderTitle = (props: HeaderComponentProps) => {
  return (
    <Container className={styles.text}>
      <Typography className={styles.title}>{props.values?.Judul || Constant.HeaderNumber.title}</Typography>
    </Container>
  );
};

const HeaderImage = (props: HeaderComponentProps) => {
  return (
    <Container className={styles.text}>
      <Image src="/images/logo.png" width={120} height={80} alt="logo.png" priority />
      <Typography style={{ marginTop: '1vh', fontStyle: 'Tahoma' }} className={styles.title}>
        {props.values?.Judul || Constant.HeaderImage.title}
      </Typography>
      <Typography
        style={{ marginBottom: '2vh', fontSize: '14px', fontStyle: 'Tahoma', marginTop: '-5px' }}
      >{`Nomor: ${props.values?.docNo}`}</Typography>
    </Container>
  );
};

const HeaderNumber = (props: HeaderComponentProps) => {
  return (
    <>
      <Grid container className={styles.number} style={{ paddingRight: '30px' }}>
        {/* Nomor */}
        <Grid item xs={8.3} />
        <Grid item xs={1} style={{ marginTop: '0px' }}>
          Nomor
        </Grid>
        <Grid item xs={2.7} style={{ marginTop: '0px' }}>
          : {props.values?.docNo || Constant.HeaderNumber.docNo}
        </Grid>
        {/* Tanggal */}
        <Grid item xs={8.3} />
        <Grid item xs={1} style={{ marginBottom: '20px' }}>
          Tanggal
        </Grid>
        <Grid item xs={2.7}>
          :{' '}
          {props.values?.letterDate
            ? dayjs(props.values?.letterDate).format('DD MMMM YYYY')
            : Constant.HeaderNumber.date}
        </Grid>
      </Grid>
      <HeaderTitle {...props} />
    </>
  );
};

const HeaderTravel = (props: HeaderComponentProps) => {
  return (
    <Container className={styles.text_dinas} style={{ marginBottom: '30px' }}>
      <Grid item container>
        <Grid item xs={0.5} style={{ marginTop: '-20px' }}>
          <Image src="/images/logo.png" width={120} height={80} alt="logo.ong" priority />
        </Grid>
        <Grid item xs={11.5} style={{ marginTop: '0px' }}>
          <Typography style={{ textAlign: 'center', fontStyle: 'Tahoma' }}>
            PERUMDA TIRTA BENTENG KOTA TANGERANG
          </Typography>
          <Typography style={{ textAlign: 'center', fontStyle: 'Tahoma' }}>
            Jl. Komplek P.U. Prosida Bendungan Ps.Baru, Kel. Mekarsari,
          </Typography>
          <Typography style={{ textAlign: 'center', fontStyle: 'Tahoma' }}>Kec.Neglasari-Kota Tangerang</Typography>
          <Typography style={{ textAlign: 'center', fontStyle: 'Tahoma' }}>
            Telp. (021) 5587234, 5538865 Fax. (021) 55799287
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const HeaderImageOnly = (props: HeaderComponentProps) => {
  return (
    <Container className={styles.text}>
      <Image src="/images/logo.png" width={120} height={80} alt="logo.png" priority />
    </Container>
  );
};

const HeaderTitleAndDocNo = (props: HeaderComponentProps) => {
  return (
    <Container className={styles.text}>
      <Image src="/images/logo.png" width={120} height={80} alt="logo.png" priority />
      <Typography style={{ marginTop: '1.5vh', fontStyle: 'Tahoma' }} className={styles.title}>
        {props.values?.Judul || Constant.HeaderImage.title}
      </Typography>
      <Typography style={{ marginBottom: '4vh', fontStyle: 'Tahoma' }}>{`Nomor: ${
        props.values?.docNo || Constant.HeaderImage.docNo
      }`}</Typography>
    </Container>
  );
};

const Default = () => {
  return <></>;
};

const HEADER: Record<HeaderEnum, (props: HeaderComponentProps) => React.ReactNode> = {
  [HeaderEnum.HeaderImage]: props => <HeaderImage {...props} />,
  [HeaderEnum.HeaderTitle]: props => <HeaderTitle {...props} />,
  [HeaderEnum.HeaderNumber]: props => <HeaderNumber {...props} />,
  [HeaderEnum.HeaderTravel]: props => <HeaderTravel {...props} />,
  [HeaderEnum.HeaderImageOnly]: props => <HeaderImageOnly {...props} />,
  [HeaderEnum.HeaderTitleAndDocNo]: props => <HeaderTitleAndDocNo {...props} />,
  [HeaderEnum.Default]: props => <Default />
};

const HeaderComponent: React.FC<HeaderComponentProps> = props => {
  const selectedEnumValue: HeaderEnum = props.code ? HeaderEnum[props.code] : HeaderEnum.Default;

  const selectedComponent = HEADER[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default HeaderComponent;
