import React, { useRef } from 'react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { StoreContext } from '@/context/context';

import { Box, Button, Stack } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { optionType } from '@/components/FormControlled/Formik/AutoComplete/AutoComplete.types';

interface DetailIncomingMailProps {
  detailData: any;
  history: any;
  mailDetail: any;
  master: {
    employee: optionType[];
  };
  file: any;
}
// define snackbar component
const MailViewer = (props: DetailIncomingMailProps) => {
  const { file } = props;
  const { state, actions } = React.useContext(StoreContext);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page

  // define handle close
  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
    setNumPages(nextNumPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/'
  };

  // PRINT INCOMING EXTERNAL
  const judul = props.mailDetail?.result?.component?.header?.value?.Judul;
  const subject = props?.mailDetail?.subject;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
    documentTitle: `${judul} ${' '} ${subject}`,
    onAfterPrint: () => {}
  });

  return (
    <React.Fragment>
      <>
        <Box className="pass-title" ref={componentRef} style={{ width: '100%', backgroundColor: '' }}>
          <Stack justifyContent="center" alignItems="center">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              renderMode="canvas"
              className=""
            >
              <Page
                className=""
                key={pageNumber}
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onLoadSuccess={onPageLoadSuccess}
                onRenderError={() => setLoading(false)}
                // width={100}
              />
            </Document>
            <Button
              style={{ marginTop: '55vh', position: 'absolute' }}
              variant="contained"
              onClick={handlePrint}
              className="btn-primary-print"
            >
              Print To PDF
            </Button>
          </Stack>
        </Box>
      </>
    </React.Fragment>
  );
};

export default MailViewer;
