import React from 'react';
import { DispositionComponentProps, DispositionEnum } from './Disposition.types';
import { Box, Grid, Typography } from '@mui/material';
import { ContainerLeft } from './Disposition.styled';

const Disposition1 = (props: DispositionComponentProps) => {
  const { values } = props;
  return (
    <>
      <Typography
        style={{
          fontStyle: 'Tahoma',
          textDecoration: 'underline',
          marginLeft: '60px',
          // marginRight: '1.5cm',
          fontSize: '0.8rem',
          marginBottom: '-35px'
        }}
      >
        Disposisi :
      </Typography>
      <Grid container item style={{ paddingLeft: '60px', paddingRight: '44px' }}>
        <Grid item xs={6}>
          <Box sx={{ border: 1 }}>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '5px' }}>Kepada:</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1 }}>
            <Typography style={{ fontSize: '0.8rem', marginLeft: '5px' }}> Kepada:</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <ContainerLeft sx={{ border: 1, minHeight: '241px' }}>
            {values?.['Mengetahui & Menyetujui'] && (
              <>
                <Typography style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '5px' }}>
                  Mengetahui/Menyetujui:{' '}
                </Typography>
                {props.mailDisposition?.['Mengetahui & Menyetujui']?.qr_url && (
                  <img
                    style={{
                      textAlign: 'center',
                      width: '150px',
                      marginBottom: '5px',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                    src={props?.mailDisposition?.['Mengetahui & Menyetujui']?.qr_url}
                    // alt="approve.png"
                  />
                )}
                <Typography style={{ marginBottom: '0px', textAlign: 'center', fontSize: '0.8rem' }}>
                  {values['Mengetahui & Menyetujui']?.position || ''}
                </Typography>
                <Typography style={{ textAlign: 'center', fontSize: '0.8rem', marginBottom: '5px' }}>
                  {values['Mengetahui & Menyetujui']?.name || ''}
                </Typography>
              </>
            )}
          </ContainerLeft>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1, minHeight: '241px' }}></Box>
        </Grid>
      </Grid>
    </>
  );
};

const Disposition2 = (props: DispositionComponentProps) => {
  return (
    <>
      <Typography style={{ fontStyle: 'oblique', textDecoration: 'underline' }}>Disposisi II :</Typography>
      <Grid container item>
        <Grid item xs={6}>
          <Box sx={{ border: 1 }}>
            <Typography style={{ fontSize: '0.9rem' }}>Kepada:</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1 }}>
            <Typography style={{ fontSize: '0.9rem' }}>Kepada:</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1, minHeight: '160px' }}>
            <Typography style={{ marginLeft: '85px', fontSize: '0.9rem' }}>Mengetahui/Menyetujui : </Typography>

            <Typography style={{ marginBottom: '80px', marginLeft: '110px', fontSize: '0.9rem' }}>
              Direktur Utama
            </Typography>
            <Typography style={{ marginLeft: '105px', fontSize: '0.9rem' }}>Doddy Effendi, SH </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1, minHeight: '160px' }}></Box>
        </Grid>
      </Grid>
    </>
  );
};

const Disposition3 = (props: DispositionComponentProps) => {
  return (
    <>
      <Typography style={{ fontStyle: 'oblique', textDecoration: 'underline' }}>Disposisi III :</Typography>
      <Grid container item>
        <Grid item xs={6}>
          <Box sx={{ border: 1 }}>
            <Typography style={{ fontSize: '0.9rem' }}>Kepada:</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1 }}>
            <Typography style={{ fontSize: '0.9rem' }}>Kepada:</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1, minHeight: '160px' }}>
            <Typography style={{ marginLeft: '85px', fontSize: '0.9rem' }}>Mengetahui/Menyetujui : </Typography>

            <Typography style={{ marginBottom: '80px', marginLeft: '110px', fontSize: '0.9rem' }}>
              Direktur Utama
            </Typography>
            <Typography style={{ marginLeft: '105px', fontSize: '0.9rem' }}>Doddy Effendi, SH </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ border: 1, minHeight: '160px' }}></Box>
        </Grid>
      </Grid>
    </>
  );
};

const Default = () => {
  return <></>;
};

const DISPOSITION: Record<DispositionEnum, (props: DispositionComponentProps) => React.ReactNode> = {
  [DispositionEnum.Disposition1]: props => <Disposition1 {...props} />,
  [DispositionEnum.Disposition2]: props => <Disposition2 {...props} />,
  [DispositionEnum.Disposition3]: props => <Disposition3 {...props} />,
  [DispositionEnum.Default]: props => <Default />
};

const DispositionComponents: React.FC<DispositionComponentProps> = props => {
  const selectedEnumValue: DispositionEnum = props.code ? DispositionEnum[props.code] : DispositionEnum.Default;

  const selectedComponent = DISPOSITION[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default DispositionComponents;
