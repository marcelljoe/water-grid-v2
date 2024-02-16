import { Grid, Container, DialogTitle, DialogContent } from '@mui/material';
import React from 'react';

const ModalFile = (props: any) => {
  const { data } = props;

  return (
    <React.Fragment>
      <DialogTitle>List Attachment</DialogTitle>
      <DialogContent style={{ width: '500px', minHeight: '100px' }}>
        <Container>
          {data?.mailAttachment?.map((item: any, index: number) => {
            return (
              <Grid item xs={12} md={12} key={index}>
                <a href={item.url} key={index} style={{ fontSize: '0.9rem', color: 'blue' }}>
                  {item.url}
                </a>
              </Grid>
            );
          })}
        </Container>
      </DialogContent>
    </React.Fragment>
  );
};

export default ModalFile;
