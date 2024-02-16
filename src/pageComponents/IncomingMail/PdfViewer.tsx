import MailViewer from '@/components/MailViewer';
import { Divider, Paper, Stack } from '@mui/material';
import React from 'react';

interface PreviewPageProps {
  mailDetail?: any;
  detailData: any;
  history: any;
}

const PdfViewer: React.FC<PreviewPageProps> = props => {
  if (props.mailDetail?.mailAttachment < 1) {
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
        <Stack style={{ height: 300 }} justifyContent="center" alignItems="center">
          <p>Tidak ada surat</p>
        </Stack>
      </Paper>
    );
  }

  return props.mailDetail?.mailAttachment?.map((item: any, index: number) => {
    return (
      <Paper
        key={index}
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
          <h5 className="card-title">Preview Surat: {item.url}</h5>
        </Stack>
        <Divider />
        <MailViewer
          file={`${process.env.NEXT_PUBLIC_DOMAIN}/api/file/${item.path}`}
          detailData={props.detailData}
          history={props.history}
          mailDetail={props.mailDetail}
          master={{
            employee: []
          }}
        />
      </Paper>
    );
  });
};

export default React.memo(PdfViewer);
