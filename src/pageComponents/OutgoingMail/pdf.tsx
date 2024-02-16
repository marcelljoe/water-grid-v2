import { Box, Button, Stack } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import ViewTemplate from '../Template/Page/ViewTemplate';

import axios from 'axios';
// import domtoimage from 'dom-to-image';

declare var self: any;
interface DetailIncomingMailProps {
  mailDetail: any;
  type: string;
}

const PrintPdf = (props: DetailIncomingMailProps) => {
  const [onSend, setOnSend] = React.useState<boolean>(false);
  const judul = props.mailDetail?.result?.component?.header?.value?.Judul;
  const subject = props?.mailDetail?.subject;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
    documentTitle: `${judul} ${' '} ${subject}`,
    onAfterPrint: () => {}
  });

  // const handleDownloadPdf = () => {
  //   const judul = props.mailDetail?.result?.component?.header?.value?.Judul || '';
  //   const subject = props?.mailDetail?.subject;
  //   const input = componentRef.current;

  //   if (input) {
  //     html2pdf(input, {
  //       margin: 10,
  //       filename: `${judul} ${subject}.pdf`,
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //     });
  //   }
  // };
  const sendMail = () => {
    setOnSend(true);
  };

  useEffect(() => {
    if (onSend == true) {
      const initHtml2Pdf = async () => {
        try {
          // Import html2pdf.js dynamically
          const { default: html2pdf } = await import('html2pdf.js');
          const { default: jsPDF } = await import('jspdf');
          const { default: html2canvas } = await import('html2canvas');

          // Your logic with html2pdf
          const judul = props.mailDetail?.result?.component?.header?.value?.Judul || '';
          const subject = props?.mailDetail?.subject;
          const input = componentRef.current;

          if (input) {
            const canvas = await html2canvas(input);

            const pdf = new jsPDF({
              unit: 'mm',
              format: 'a4',
              orientation: 'portrait'
            });

            await html2pdf(input, {
              margin: 10,
              filename: `${judul} ${subject}.pdf`,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              output: pdf
            });

            const aspectRatio = canvas.width / canvas.height;
            const pdfWidth = pdf.internal.pageSize.getWidth() * 0.8; // Adjust width to 80%
            const pdfHeight = (pdfWidth / aspectRatio) * 1.2;

            // Add the captured canvas to the jsPDF instance with adjusted dimensions and centering
            pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0.5, 0.5, pdfWidth, pdfHeight);

            const pdfBlob = pdf.output('blob');

            // const pdfBlob = pdf.output('blob');

            // Create a File object from the Blob
            const pdfFile = new File([pdfBlob], `${judul} ${subject}.pdf`, { type: 'application/pdf' });
            // Create a FormData object and append the file
            // const formData = new FormData();
            // formData.append('email', props?.mailDetail?.value?.addressedToEmail);
            // // formData.append('email', 'fachri.bkki@gmail.com');
            // formData.append('subject', props?.mailDetail?.value?.subject);
            // formData.append('text', '-');
            // formData.append('file', pdfFile);

            // try {
            //   const response = await axios.post(`/api/sendMail`, formData);

            //   setOnSend(false);
            //   if (response.status === 200 || response.status === 201) {
            //     alert('Success');
            //   }
            // } catch (error) {
            //   console.error('Error sending mail:', error);
            // }
          }
        } catch (error) {
          console.error('Error loading html2pdf.js:', error);
        }
      };
      initHtml2Pdf();
    }

    // Call the initialization function
  }, [onSend]);
  // const generatePDFAndSendEmail = async () => {
  //   try {
  //     const doc = new jsPDF({ orientation: 'landscape', unit: 'in', format: [4, 2] });

  //     const container = document.createElement('div');

  //     const image: any = await domtoimage.toPng(container, { width: 800, height: 1200 });

  //     // Add image to the PDF document
  //     doc.addImage(image, 'PNG', 0, 0, 210, 297);

  //     // Save the document as a specific file type (e.g., 'blob', 'dataurl', 'arraybuffer', etc.)
  //     const pdfBlob = doc.output('blob');

  //     // Convert Blob to File
  //     const fileName = 'your_file_name.pdf';
  //     const file = new File([pdfBlob], fileName, { type: 'application/pdf', lastModified: Date.now() });

  //     // ... rest of your code to send email using axios
  //     const formData = new FormData();
  //     formData.append('email', 'fachri.bkki@gmail.com');
  //     formData.append('subject', 'fafa');
  //     formData.append('text', 'caca');
  //     formData.append('file', file);
  //     axios
  //       .post(`/api/sendMail`, formData)
  //       .then(res => {
  //         if (res.status == 200 || res.status == 201) {
  //           alert('Success');
  //         }
  //       })
  //       .catch(err => {
  //         console.error('error', err);
  //       });
  //   } catch (error) {
  //     console.error('Error generating or sending PDF:', error);
  //   }
  // };

  // Function to generate content based on ViewTemplate values

  return (
    <>
      <Box className="pass-title" ref={componentRef} style={{ width: '100%' }}>
        <Stack justifyContent="center" alignItems="center">
          <ViewTemplate
            values={{
              type: props.type,
              ...props.mailDetail?.result?.component,
              value: props.mailDetail?.value
            }}
            mailSignature={props.mailDetail?.mailSignature}
            mailDisposition={props.mailDetail?.mailDisposition}
          />
        </Stack>
      </Box>
      <Button variant="contained" onClick={handlePrint} className="btn-primary-print">
        Print To PDF
      </Button>
      <Button variant="contained" onClick={() => sendMail()} className="btn-primary-print">
        Download
      </Button>
    </>
  );
};

export default PrintPdf;
