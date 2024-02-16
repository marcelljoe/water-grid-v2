import { Grid, Button, Stack } from '@mui/material';
import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { ContentTitle } from '../Template/Form/Form.styled';
import { PropsDispositionForm } from './IncomingMail.types';
import React from 'react';

import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';

const IncomingMailFormDisposition = (props: PropsDispositionForm) => {
  const { isSubmitting, isValid, dirty, values, handleClose, employee } = props;
  return (
    <React.Fragment>
      <>
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={12}>
            <FormInput>
              <ContentTitle>Pilih Karyawan Disposisi</ContentTitle>

              <FormControl fullWidth variant="standard">
                <FormikField
                  name="employee"
                  fieldType={FormikFieldType.AutoComplete}
                  options={employee ?? null}
                  placeholder="Pilih Karyawan"
                  size="small"
                  multiple={true}
                />
              </FormControl>
            </FormInput>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInput>
              <ContentTitle>Deskripsi</ContentTitle>

              <FormControl fullWidth variant="standard">
                <FormikField fieldType={FormikFieldType.TextField} name="notes" size="small" placeholder="Notes" />
              </FormControl>
            </FormInput>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInput>
              <ContentTitle>Tanggal Disposisi</ContentTitle>
              <FormikField fieldType={FormikFieldType.TextField} type="date" name="date" size="small" />
            </FormInput>
          </Grid>
        </Grid>
        <Stack style={{ marginTop: '30px' }} direction="row" spacing={2}>
          <Button
            className="btn-primary"
            fullWidth
            variant="contained"
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Simpan
          </Button>
          <Button
            className="btn-secondary"
            fullWidth
            variant="contained"
            onClick={() => {
              handleClose?.();
            }}
          >
            Kembali
          </Button>
        </Stack>
      </>
    </React.Fragment>
  );
};

export default IncomingMailFormDisposition;
