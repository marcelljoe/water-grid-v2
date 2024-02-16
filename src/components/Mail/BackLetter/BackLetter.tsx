import React from 'react';
import { BackLetterComponentProps, BackLetterEnum } from './BackLetter.types';

import { Container, Item, boxStyle, cellStyle, TypographyContainer } from './BackLetter.styled';
import styles from './BackLetter.module.css';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import ReactHtmlParser from 'react-html-parser';

const BackLetterSPPD = (props: BackLetterComponentProps) => {
  if (props.values?.['Belakang Surat']) {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Container style={{ overflow: 'hidden', paddingRight: '100px' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Belakang Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container gap={'1rem'}>
        <Grid item xs={12}>
          I. Dari Pejabat Pemberi Perintah
        </Grid>
        <Grid item xs={12}>
          <Table style={{ marginBottom: '20px' }}>
            <TableHead>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center'
                }}
              >
                Tempat Kedudukan Pegawai yang Diberi Perintah
              </TableCell>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center'
                }}
              >
                Berangkat
              </TableCell>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center'
                }}
              >
                Kembali
              </TableCell>
            </TableHead>
            <TableBody>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center',
                  minHeight: '300px'
                }}
              ></TableCell>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center',
                  minHeight: '300px'
                }}
              >
                <Typography style={{ marginBottom: '15px', fontFamily: 'Tahoma' }}>Tanggal :</Typography>
                <Typography style={{ marginBottom: '80px', fontFamily: 'Tahoma' }}>Direktur Umum</Typography>
                <Typography style={{ fontFamily: 'Tahoma', textDecoration: 'underline' }}>Doddy Effendi, SH</Typography>
              </TableCell>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center'
                }}
              >
                <Typography style={{ marginBottom: '15px', fontFamily: 'Tahoma' }}>Tanggal :</Typography>
                <Typography style={{ marginBottom: '80px', fontFamily: 'Tahoma' }}>Direktur Umum</Typography>
                <Typography style={{ fontFamily: 'Tahoma', textDecoration: 'underline' }}>Doddy Effendi, SH</Typography>
              </TableCell>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Grid container gap={'1rem'}>
        <Grid item xs={12}>
          II. Dari Pejabat di daerah penugasan yang dikunjungi
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px',
                    width: '33%',
                    textAlign: 'center'
                  }}
                  rowSpan={2}
                >
                  Kantor yang dikunjungi
                </TableCell>
                <TableCell
                  colSpan={2}
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px',
                    width: '33%',
                    textAlign: 'center'
                  }}
                >
                  Datang
                </TableCell>

                <TableCell
                  colSpan={2}
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px',
                    width: '33%',
                    textAlign: 'center'
                  }}
                >
                  Kembali
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px'
                  }}
                >
                  Tanggal
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px'
                  }}
                >
                  Tandatangan
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px'
                  }}
                >
                  Tanggal
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px'
                  }}
                >
                  Tandatangan
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle} height={180}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle} height={180}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle} height={180}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle} height={180}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle} height={180}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}></TableCell>
              </TableRow>
            </TableBody>
            {/* <TableBody>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center',
                  minHeight: '300px'
                }}
              ></TableCell>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center',
                  minHeight: '300px'
                }}
              >
                <Typography style={{ marginBottom: '15px', fontFamily: 'Tahoma' }}>Tanggal :</Typography>
                <Typography style={{ marginBottom: '80px', fontFamily: 'Tahoma' }}>Direktur Umum</Typography>
                <Typography style={{ fontFamily: 'Tahoma', textDecoration: 'underline' }}>
                  Doddy Effendi, SH
                </Typography>
              </TableCell>
              <TableCell
                style={{
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px',
                  width: '33%',
                  textAlign: 'center'
                }}
              >
                <Typography style={{ marginBottom: '15px', fontFamily: 'Tahoma' }}>Tanggal :</Typography>
                <Typography style={{ marginBottom: '80px', fontFamily: 'Tahoma' }}>Direktur Umum</Typography>
                <Typography style={{ fontFamily: 'Tahoma', textDecoration: 'underline' }}>
                  Doddy Effendi, SH
                </Typography>
              </TableCell>
            </TableBody> */}
          </Table>
        </Grid>
      </Grid>
      {/* <Typography style={{ fontStyle: 'oblique', textDecoration: 'underline' }}>
        Dari Pejabat Pemberi Perintah
      </Typography>
      <Table style={{ minWidth: '100%', minHeight: '100%' }}>
        <TableHead style={{ width: '100%' }}>
          <TableCell style={cellStyle}>Tempat Kedudukan Pegawai yang Diberi Perintah</TableCell>
          <TableCell style={cellStyle}>Berangkat</TableCell>
          <TableCell style={cellStyle}>Kembali</TableCell>
        </TableHead>
      </Table> */}
    </>
  );
};

const Default = () => {
  return <></>;
};

const BACKLETTER: Record<BackLetterEnum, (props: BackLetterComponentProps) => React.ReactNode> = {
  [BackLetterEnum.BackLetterSPPD]: props => <BackLetterSPPD {...props} />,
  [BackLetterEnum.Default]: props => <Default />
};

const BackLetterComponent: React.FC<BackLetterComponentProps> = props => {
  const selectedEnumValue: BackLetterEnum = props.code ? BackLetterEnum[props.code] : BackLetterEnum.Default;

  const selectedComponent = BACKLETTER[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default BackLetterComponent;
