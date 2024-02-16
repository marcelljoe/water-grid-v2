import React from 'react';
import { ContentComponentProps, ContentEnum } from './Content.types';
import { Container, Item, TypographyContainer, cellStyle, ItemDownPayment, Item2 } from './Content.styled';
import styles from './Content.module.css';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ReactHtmlParser from 'react-html-parser';
import Constant from './Content.constant';

// SURAT TUGAS
const ContentList = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Container>
            <TypographyContainer style={{ overflow: 'hidden', fontStyle: 'Tahoma', paddingRight: '5px' }}>
              <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
            </TypographyContainer>
          </Container>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container className={styles.text}>
      <Typography style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>{Constant.ContentList.intro}</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>1. Nama 1</Item>
          <Item>2. Nama 2</Item>
          <Item>3. Nama 3</Item>
          <Item>4. Nama 4</Item>
          <Item>5. Nama 5</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>6. Nama 6</Item>
          <Item>7. Nama 7</Item>
          <Item>8. Nama 8</Item>
          <Item>9. Nama 9</Item>
          <Item>10. Nama 10</Item>
        </Grid>
      </Grid>
      <Grid item xs={11}>
        <TypographyContainer>
          <Typography style={{ marginBottom: '20px', fontFamily: 'Tahoma', fontSize: '1rem', marginRight: '1.1cm' }}>
            Untuk melaksanakan tugas sebagai petugas paduan suara pada kegiatan Upacara HUT Kemerdekaan RI ke-78 tanggal
            17 Agustus 2023 di Kantor Perumda Tirta Benteng Kota Tangerang. Surat tugas ini berlaku terhitung sejak
            tanggal ditetapkan sampai dengan diselesaikannya tugas sebagaimana maksud diatas.
          </Typography>
          {/* <Typography style={{ marginBottom: '20px', fontFamily: 'Tahoma', fontSize: '1rem' }}>
            Surat tugas ini berlaku terhitung sejak tanggal ditetapkan sampai dengan diselesaikannya tugas sebagaimana
            maksud diatas.
          </Typography> */}
          <Typography style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>
            Demikiran agar Surat Tugas ini dilaksanakan sebagaimana mestinya dengan penuh rasa tanggung jawab.
          </Typography>
        </TypographyContainer>
      </Grid>
    </Container>
  );
};

//NOTA DINAS
const ContentText = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Container>
            <TypographyContainer
              style={{ overflow: 'hidden', fontStyle: 'Tahoma', fontSize: '0.8rem', paddingRight: '10px' }}
            >
              <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
            </TypographyContainer>
          </Container>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container className={styles.text}>
      <Typography style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>
        Dengan hormat, bersama ini kami sampaikan Laporan pertanggungjawaban Uang Muka Kerja No. 22/UMK-STI/VI/2023
      </Typography>
      <Typography style={{ marginBottom: '20px', fontFamily: 'Tahoma', fontSize: '1rem' }}>
        Biaya Pemeliharaan Komputer kode perkiraan 96.06.12
      </Typography>
      <Typography style={{ marginBottom: '20px', fontFamily: 'Tahoma', fontSize: '1rem' }}>
        Penerimaan : Rp. 7.810.000
      </Typography>
      <Typography style={{ marginBottom: '20px', fontFamily: 'Tahoma', fontSize: '1rem' }}>Pengeluaran :</Typography>
      <Grid container rowSpacing={1}>
        <Grid item xs={10.5}>
          <Table className={styles.text}>
            <TableBody className={styles.text}>
              <TableRow className={styles.text}>
                <TableCell>1</TableCell>
                <TableCell>Sparepart Laptop</TableCell>
                <TableCell>12 Juli 2023</TableCell>
                <TableCell>Rp. 347.300</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>2</TableCell>
                <TableCell>Aksesoris Jaringan</TableCell>
                <TableCell>12 Juli 2023</TableCell>
                <TableCell>Rp. 472.600</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>3</TableCell>
                <TableCell>Sparepart PC</TableCell>
                <TableCell>12 Juli 2023</TableCell>
                <TableCell>Rp. 922.200</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>4</TableCell>
                <TableCell>Akseoris Laptop</TableCell>
                <TableCell>13 Juli 2023</TableCell>
                <TableCell>Rp. 1.272.450</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>5</TableCell>
                <TableCell>Sparepart PC & Laptop</TableCell>
                <TableCell>17 Juli 2023</TableCell>
                <TableCell>Rp. 656.198</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>6</TableCell>
                <TableCell>Tinta Printer</TableCell>
                <TableCell>17 Juli 2023</TableCell>
                <TableCell>Rp. 910.800</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>7</TableCell>
                <TableCell>Sparepart Laptop</TableCell>
                <TableCell>21 Juli 2023</TableCell>
                <TableCell>Rp. 255.700</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>8</TableCell>
                <TableCell>Service Printer</TableCell>
                <TableCell>21 Juli 2023</TableCell>
                <TableCell>Rp. 900.000</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>9</TableCell>
                <TableCell>Sparepart Laptop</TableCell>
                <TableCell>24 Juli 2023</TableCell>
                <TableCell>Rp. 329.250</TableCell>
              </TableRow>
              <TableRow className={styles.text}>
                <TableCell>10</TableCell>
                <TableCell>Aksesoris Komputer</TableCell>
                <TableCell>25 Juli 2023</TableCell>
                <TableCell>Rp. 1.725.000</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter style={{ display: 'flex-end' }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell style={{ fontWeight: 600 }}>Jumlah Total</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Rp. 7.791.198</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell style={{ fontWeight: 600 }}>Sisa</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Rp. 18.802</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Typography style={{ fontWeight: 400, fontSize: '1rem', fontFamily: 'Tahoma' }}>
            Demikian yang dapat kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

//PERMOHONAN UANG MUKA KERJA
const ContentDownPayment = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Container style={{ overflow: 'hidden', paddingRight: '105px' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Container className={styles.text}>
        <Typography style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>Mata Anggaran</Typography>
        <Box sx={{ border: 1 }}>
          <Table className={styles.text}>
            <TableHead>
              <TableRow>
                <TableCell style={cellStyle}>No.</TableCell>
                <TableCell style={cellStyle}>Uraian</TableCell>
                <TableCell style={cellStyle}>Volume</TableCell>
                <TableCell style={cellStyle}>Nilai Rp.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>1</TableCell>
                <TableCell style={cellStyle}>Pemeliharaan komputer</TableCell>
                <TableCell style={cellStyle}>LS</TableCell>
                <TableCell style={cellStyle}>7.810.000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    border: '1px solid #000', // Add borders to cells
                    padding: '8px',
                    textAlign: 'center'
                  }}
                  colSpan={2}
                >
                  Jumlah
                </TableCell>
                <TableCell style={cellStyle}></TableCell>
                <TableCell style={cellStyle}>7.810.000</TableCell>
              </TableRow>

              {/* Add more rows and cells here */}
            </TableBody>
          </Table>
        </Box>
        <Grid item container rowGap={0.5}>
          <Grid item xs={2}>
            Catatan:
          </Grid>
          <Grid item xs={5} rowGap={0.5}>
            <ItemDownPayment>a. Pagu Anggaran</ItemDownPayment>
            <ItemDownPayment>b. Realisasi sd. lalu</ItemDownPayment>
            <ItemDownPayment>c. Permohonan ini</ItemDownPayment>
            <ItemDownPayment>d. Realisasi sd sekarang (b+c) </ItemDownPayment>
            <ItemDownPayment style={{ marginBottom: '10px' }}>e. Sisa Anggaran (a-d) </ItemDownPayment>
            <ItemDownPayment>*) Sudah / belum termasuk dalam Anggaran</ItemDownPayment>
          </Grid>
          <Grid item xs={4} rowGap={0.5}>
            <ItemDownPayment>Rp. 93.720.000</ItemDownPayment>
            <ItemDownPayment>Rp. 40.191.949</ItemDownPayment>
            <ItemDownPayment>Rp. 7.810.000</ItemDownPayment>
            <ItemDownPayment>Rp. 48.001.994</ItemDownPayment>
            <ItemDownPayment>Rp. 45.718.006</ItemDownPayment>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// PERINTAH PERJALANAN DINAS
const ContentTravel = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Container style={{ overflow: 'hidden', paddingRight: '100px' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <TableContainer>
        <Table style={{}}>
          <TableBody>
            {/* {data.map((row, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <>
                    <TableCell rowSpan={data.length}>Header Cell (Vertical Merge)</TableCell>
                    <TableCell colSpan={2}>Header Cell (Horizontal Merge)</TableCell>
                  </>
                )}
                {index !== 0 && (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                  </>
                )}
              </TableRow>
            ))} */}
            <TableRow>
              <TableCell style={cellStyle}>I</TableCell>
              <TableCell style={cellStyle}>Pejabat yang memberi perintah</TableCell>
              <TableCell style={cellStyle}></TableCell>
              <TableCell style={cellStyle}>Direksi Perumda Tirta Benteng Kota Tangenrang</TableCell>
            </TableRow>
            {[...Array(10)].map((_, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell rowSpan={10} style={cellStyle}>
                    II
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell rowSpan={10} style={cellStyle}>
                    Nama, Jabatan dan Pangkat Golongan Pegawai yang diperintahkan
                  </TableCell>
                )}
                {/* Content for other cells */}
                <TableCell style={cellStyle} align={'center'}>
                  {index + 1}
                </TableCell>
                <TableCell style={cellStyle}></TableCell>
              </TableRow>
            ))}
            {[...Array(4)].map((_, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell rowSpan={4} style={cellStyle}>
                    III
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell rowSpan={4} style={cellStyle}>
                    Perjalanan Dinas yang Diperintahkan
                  </TableCell>
                )}
                {index === 0 && <TableCell rowSpan={4} style={cellStyle}></TableCell>}
                {/* Content for other cells */}
                {index === 0 && (
                  <Box sx={{ border: 0.5 }}>
                    <Table style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>
                      <TableRow>Dari : Tangerang</TableRow>
                      <TableRow>Tujuan Ke :</TableRow>
                      <TableRow>Dengan :</TableRow>
                      <TableRow>Kendaraan :</TableRow>
                    </Table>
                  </Box>
                )}
              </TableRow>
            ))}
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell rowSpan={3} style={cellStyle}>
                    IV
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell rowSpan={3} style={cellStyle}>
                    Perjalanan Dinas yang Direncanakan
                  </TableCell>
                )}
                {index === 0 && <TableCell rowSpan={3} style={cellStyle}></TableCell>}
                {/* Content for other cells */}
                {index === 0 && (
                  <Box sx={{ border: 0.5 }}>
                    <Table style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>
                      <TableRow>Selama :</TableRow>
                      <TableRow>Dari Tanggal :</TableRow>
                      <TableRow>S/d Tanggal</TableRow>
                    </Table>
                  </Box>
                )}
              </TableRow>
            ))}
            {[...Array(2)].map((_, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell rowSpan={2} style={cellStyle}>
                    V
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell rowSpan={2} style={cellStyle}>
                    Perjalanan Dinas yang Direncanakan
                  </TableCell>
                )}
                {index === 0 && <TableCell rowSpan={2} style={cellStyle}></TableCell>}
                {index === 0 && <TableCell rowSpan={2} style={cellStyle}></TableCell>}
                <TableCell align={'center'}></TableCell>
                {/* Content for other cells */}
              </TableRow>
            ))}
            {[...Array(2)].map((_, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell rowSpan={2} style={cellStyle}>
                    VI
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell rowSpan={2} style={cellStyle}>
                    Perjalanan Dinas yang Direncanakan
                  </TableCell>
                )}
                {index === 0 && <TableCell rowSpan={2} style={cellStyle}></TableCell>}
                {/* Content for other cells */}
                {index === 0 && (
                  <Box sx={{ border: 0.5 }}>
                    <Table style={{ fontFamily: 'Tahoma', fontSize: '1rem' }}>
                      <TableRow>Atas Beban :</TableRow>
                      <TableRow>Pasal Anggaran :</TableRow>
                    </Table>
                  </Box>
                )}
              </TableRow>
            ))}
            <TableRow>
              <TableCell style={cellStyle}>VII</TableCell>
              <TableCell style={cellStyle}></TableCell>
              <TableCell style={cellStyle}></TableCell>
              <TableCell style={cellStyle}>Lihat Sebelah</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// DAFTAR KEBUTUHAN BARANG
const ContentGoods = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <>
        <Grid container style={{ marginTop: '-10px' }}>
          <Grid item xs={12}>
            <Container style={{ overflow: 'hidden', paddingRight: '100px' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  width: '5%',
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px'
                }}
                align="center"
              >
                No.
              </TableCell>
              <TableCell
                style={{
                  width: '15%',
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px'
                }}
                align="center"
              >
                Kode Produk
              </TableCell>
              <TableCell
                style={{
                  width: '40%',
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px'
                }}
                align="center"
              >
                Nama Produk
              </TableCell>
              <TableCell
                style={{
                  width: '10%',
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px'
                }}
                align="center"
              >
                QTY
              </TableCell>
              <TableCell
                style={{
                  width: '10%',
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px'
                }}
                align="center"
              >
                Satuan
              </TableCell>
              <TableCell
                style={{
                  width: '20%',
                  border: '1px solid #000', // Add borders to cells
                  padding: '8px'
                }}
                align="center"
              >
                Kode
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>1</TableCell>
              <TableCell style={cellStyle}>420.002</TableCell>
              <TableCell style={cellStyle}>Pipa Pvc Dia.13 Mm (Aw)</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>meter</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>2</TableCell>
              <TableCell style={cellStyle}>420.001</TableCell>
              <TableCell style={cellStyle}>Pipa Gip Dia. 20 Mm ( U. Cassing )</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>meter</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>3</TableCell>
              <TableCell style={cellStyle}>420.004</TableCell>
              <TableCell style={cellStyle}>Aftap Kran Dia 13 Mm</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>4</TableCell>
              <TableCell style={cellStyle}>420.029</TableCell>
              <TableCell style={cellStyle}>Kawat Dan Segel</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>5</TableCell>
              <TableCell style={cellStyle}>420.035</TableCell>
              <TableCell style={cellStyle}>Knee Pvc Dia. 13 Mm</TableCell>
              <TableCell style={cellStyle}>700</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>6</TableCell>
              <TableCell style={cellStyle}>420.037</TableCell>
              <TableCell style={cellStyle}>Lem Pvc</TableCell>
              <TableCell style={cellStyle}>88</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>7</TableCell>
              <TableCell style={cellStyle}>420.039</TableCell>
              <TableCell style={cellStyle}>Male Threaded Adaptor Dia 13 Mm</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>8</TableCell>
              <TableCell style={cellStyle}>420.041</TableCell>
              <TableCell style={cellStyle}>Plugh Dop Pvc Dia.13 Mm</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>9</TableCell>
              <TableCell style={cellStyle}>420.051</TableCell>
              <TableCell style={cellStyle}>Tee Pvc Dia 13 Mm X 13 Mm</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>10</TableCell>
              <TableCell style={cellStyle}>420.060</TableCell>
              <TableCell style={cellStyle}>Knee Sock Drat Dalam Pvc Dia 13 Mm</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>11</TableCell>
              <TableCell style={cellStyle}>420.069</TableCell>
              <TableCell style={cellStyle}>Sock Drat Dalam Pvc Aw Dia 1/2</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>12</TableCell>
              <TableCell style={cellStyle}>420.005</TableCell>
              <TableCell style={cellStyle}>Ball Valve Male Female Dia 13 Mm</TableCell>
              <TableCell style={cellStyle}>700</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>13</TableCell>
              <TableCell style={cellStyle}>420.006</TableCell>
              <TableCell style={cellStyle}>Box Meter</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>14</TableCell>
              <TableCell style={cellStyle}>420.028</TableCell>
              <TableCell style={cellStyle}>Hdpe Pn 10 Dia 13 Mm</TableCell>
              <TableCell style={cellStyle}>2100</TableCell>
              <TableCell style={cellStyle}>meter</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>15</TableCell>
              <TableCell style={cellStyle}>420.038</TableCell>
              <TableCell style={cellStyle}>Lockable Ball Valve Angel 20 Mm X 3/4inc</TableCell>
              <TableCell style={cellStyle}>350</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>16</TableCell>
              <TableCell style={cellStyle}>420.045</TableCell>
              <TableCell style={cellStyle}>Seal Tape</TableCell>
              <TableCell style={cellStyle}>700</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>17</TableCell>
              <TableCell style={cellStyle}>420.014</TableCell>
              <TableCell style={cellStyle}>Clamp Sadle Pvc Dia. 50 X 13 Mm</TableCell>
              <TableCell style={cellStyle}>200</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>18</TableCell>
              <TableCell style={cellStyle}>420.015</TableCell>
              <TableCell style={cellStyle}>Clamp Sadle Pvc Dia. 75 X 13 Mm</TableCell>
              <TableCell style={cellStyle}>100</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
            <TableRow style={cellStyle}>
              <TableCell style={cellStyle}>19</TableCell>
              <TableCell style={cellStyle}>420.016</TableCell>
              <TableCell style={cellStyle}>Clamp Sadle Pvc Dia. 100 X 13 Mm</TableCell>
              <TableCell style={cellStyle}>50</TableCell>
              <TableCell style={cellStyle}>buah</TableCell>
              <TableCell style={cellStyle}>31.05.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} style={cellStyle}>
                <Typography style={{ fontSize: '1rem', fontFamily: 'Tahoma' }}>
                  Catatan: Digunakan untuk pemasangan SL Baru. Merujuk BA kesepakatan Barang & Jasa No.69/BA-AM/IV/2023,
                  tanggal 11 April 2023
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Typography style={{ textAlign: 'right', fontSize: '1rem', fontFamily: 'Tahoma' }}>
          {/* Tangerang, 07 September 2023 */}
        </Typography>
      </Container>
    </>
  );
};

// SURAT UNDANGAN
const ContentInvitation = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Container style={{ marginLeft: '140px', paddingRight: '190px', overflow: 'hidden', marginTop: '10px' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Container style={{ paddingLeft: '2.2cm', paddingRight: '0.8cm' }}>
      <Grid item xs={10}>
        <Typography style={{ fontFamily: 'Tahoma', fontSize: '0.7rem', fontWeight: '400' }}>
          Bersama ini kami mengundang Saudara untuk dapat hadir pada:
        </Typography>
      </Grid>
      <Grid></Grid>
      <Grid container>
        <Grid item xs={0}></Grid>
        <Grid item xs={2}>
          <Item2>Hari / Tanggal</Item2>
          <Item2>Waktu</Item2>
          <Item2>Acara</Item2>
          <Item2>Tempat</Item2>
        </Grid>
        <Grid item xs={0}>
          <Item2>:</Item2>
          <Item2>:</Item2>
          <Item2>:</Item2>
          <Item2>:</Item2>
        </Grid>
        <Grid item xs={8.5}>
          <Item2>Rabu / 5 Oktober 2023</Item2>
          <Item2>Pukul 10.00 WIB - Selesai</Item2>
          <Item2>Ekspose terkait rencana pembangunan Aplikasi E-Office Berbasis Mobile</Item2>
          <Item2>
            Kantor Perumda Tirta Benteng Jl. Komplek P.U Prosida Bendungan Pasar Baru, Kel. Mekarsari, Kec. Neglasari
            Kota Tangerang
          </Item2>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography style={{ fontFamily: 'Tahoma', fontSize: '1rem', fontWeight: '400' }}>
          Demikian disampaikan atas perhatian dan kehadirannya diucapkan terima kasih.
        </Typography>
      </Grid>
      <Grid></Grid>
    </Container>
  );
};

const ContentPurchaseOrder = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Container style={{ marginLeft: '140px', paddingRight: '190px', overflow: 'hidden', marginTop: '10px' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return <></>;
};

// PERMOHONAN PENAWARAN
const ContentBidRequest = (props: ContentComponentProps) => {
  if (props.values?.['Isi Surat']) {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <Container style={{ marginLeft: '140px', paddingRight: '185px', overflow: 'hidden' }}>
              <TypographyContainer>
                <>{ReactHtmlParser(props.values?.['Isi Surat'])}</>
              </TypographyContainer>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={1.5}></Grid>
        <Grid item xs={10.5} style={{ paddingLeft: '10px' }}>
          <Typography
            style={{
              fontSize: '0.8rem',
              lineHeight: '1.2',
              fontWeight: '400',
              fontFamily: 'Tahoma',
              textAlign: 'justify'
            }}
          >
            Dalam rangka peningkatan efisiensi dan Efektivitas dalam pengelolaan dokumen surat menyurat dilingkunan
            Perumda Tirta Benteng maka kami bermaksud mengundang saudara untuk mengajukan penawaran terkait pekerjaan
            Pembangunan aplikasi E-Office Berbasis Mobile.
          </Typography>
          <Typography
            style={{
              fontSize: '0.8rem',
              lineHeight: '1.2',
              fontWeight: '400',
              fontFamily: 'Tahoma',
              textAlign: 'justify'
            }}
          >
            Sehubungan hal tersebut diatas, terlampir kami sampaikan kerangka acuan kerja (KAK) dari pekerjaan tersebut.
          </Typography>
          <Typography
            style={{
              fontSize: '0.8rem',
              lineHeight: '1.2',
              fontWeight: '400',
              fontFamily: 'Tahoma',
              textAlign: 'justify'
            }}
          >
            Demikian kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const Default = () => {
  return <></>;
};

const CONTENT: Record<ContentEnum, (props: ContentComponentProps) => React.ReactNode> = {
  [ContentEnum.ContentList]: props => <ContentList {...props} />,
  [ContentEnum.ContentText]: props => <ContentText {...props} />,
  [ContentEnum.ContentDownPayment]: props => <ContentDownPayment {...props} />,
  [ContentEnum.ContentTravel]: props => <ContentTravel {...props} />,
  [ContentEnum.ContentGoods]: props => <ContentGoods {...props} />,
  [ContentEnum.ContentInvitation]: props => <ContentInvitation {...props} />,
  [ContentEnum.ContentBidRequest]: props => <ContentBidRequest {...props} />,
  [ContentEnum.ContentPurchaseOrder]: props => <ContentPurchaseOrder {...props} />,
  [ContentEnum.Default]: props => <Default />
};

const ContentComponent: React.FC<ContentComponentProps> = props => {
  const selectedEnumValue: ContentEnum = props.code ? ContentEnum[props.code] : ContentEnum.Default;

  const selectedComponent = CONTENT[selectedEnumValue];

  return <>{selectedComponent({ ...props })}</>;
};

export default ContentComponent;
