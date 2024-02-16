import { Grid, Button, Stack } from '@mui/material';
import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { PropsDispositionForm } from './IncomingMail.types';
import React from 'react';
import { ContentTitle } from '../Template/Form/Form.styled';

import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';

const IncomingMailFormDispositionOutgoing = (props: PropsDispositionForm) => {
  const { isSubmitting, isValid, dirty, values, handleClose, updatedData, employee, type } = props;

  return (
    <React.Fragment>
      <>
        <Grid spacing={2} sx={{ marginTop: '20px' }}>
          {type == 'internal' ? (
            <>
              <Grid item xs={12} md={12}>
                <FormInput>
                  <ContentTitle>Pilih Karyawan Disposisi</ContentTitle>
                  <FormControl fullWidth variant="standard">
                    <FormikField
                      name="employee"
                      size="small"
                      fieldType={FormikFieldType.AutoComplete}
                      options={employee ?? null}
                      placeholder="Pilih Karyawan"
                      multiple={true}
                    />
                  </FormControl>
                </FormInput>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormInput>
                  <ContentTitle>Notes</ContentTitle>
                  <FormControl fullWidth variant="standard">
                    <FormikField fieldType={FormikFieldType.TextField} name="notes" placeholder="Notes" size="small" />
                  </FormControl>
                </FormInput>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormInput>
                  <ContentTitle>Tanggal Disposisi</ContentTitle>
                  <FormikField fieldType={FormikFieldType.TextField} type="date" name="date" size="small" />
                </FormInput>
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
          ) : (
            ''
          )}
        </Grid>
      </>
    </React.Fragment>
  );
};

export default IncomingMailFormDispositionOutgoing;
