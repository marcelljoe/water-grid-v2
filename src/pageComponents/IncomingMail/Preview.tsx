import MailViewer from '@/components/MailViewer';
import { Divider, Paper, Stack } from '@mui/material';
import React from 'react';
import PrintPdf from '../OutgoingMail/pdf';
import PdfViewer from './PdfViewer';

interface PreviewPageProps {
  type: 'attachment' | 'mail';
  mailDetail?: any;
  detailData: any;
  history: any;
  master: {};
}

const Preview: React.FC<PreviewPageProps> = props => {
  const { type, mailDetail } = props;
  if (type == 'attachment') {
    return <PdfViewer mailDetail={mailDetail} detailData={props.detailData} history={props.history} />;
  }

  return (
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
  );
};

export default Preview;
