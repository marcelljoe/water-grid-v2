import { memo, useContext } from 'react';
import { Dialog, Grid, DialogTitle, IconButton, Divider } from '@mui/material';
import { StoreContext } from '@/context/context';
import React from 'react';
import useCustomFormik from '@/hooks/useCustomFormik';
import { FormikProvider, Form as FormikForm } from 'formik';
import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { Label } from '@/pageComponents/Template/Form/Form.styled';
import { ButtonPrimary, ButtonSecondary } from './Button/Button.styled';
import CloseIcon from '@mui/icons-material/Close';
import FormikField, { FormikFieldType } from './FormControlled/FormikField';

interface ModalFunction {
  handleClose: () => void;
  handleOpen: () => void;
  openModal: boolean;
  type?: string;
}

const statusOption = [
  {
    label: 'Sudah Terbaca',
    value: '1'
  },
  {
    label: 'Belum Terbaca',
    value: '0'
  }
];

const statusLetter = [
  {
    label: 'Draft',
    value: '0'
  },
  {
    label: 'Surat Langsung',
    value: '1'
  },
  {
    label: 'Paraf',
    value: '2'
  },
  {
    label: 'Disetujui',
    value: '3'
  },
  {
    label: 'Terkirim',
    value: '4'
  }
];

const FilterWrapper = (props: ModalFunction) => {
  const { state, actions } = useContext(StoreContext);
  const { handleClose, openModal, type } = props;

  let formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      status: '',
      startDate: '',
      endDate: '',
      statusLetter: ''
    },

    onSubmit: values => {
      actions.UPDATE_FILTER({
        ...state.filter,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
        statusLetter: values.statusLetter
      });
      handleClose();
    }
  });

  const resetFilter = () => {
    formik.resetForm();
    actions.UPDATE_FILTER({
      ...state.filter,
      startDate: '',
      endDate: '',
      status: '',
      statusLetter: ''
    });
    handleClose();
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{ sx: { maxWidth: '600px', borderRadius: '0.75rem', background: '#FFF' } }}
      >
        <FormikProvider value={formik}>
          <FormikForm>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.5rem'
                }}
              >
                <DialogTitle sx={{ padding: '0', fontSize: '1.5rem' }}>Filter</DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    color: '#000'
                  }}
                >
                  <CloseIcon sx={{ width: '1.5rem', height: '1.5rem' }} />
                </IconButton>
              </Grid>
              <Grid item xs={12} style={{ width: '552px' }} sx={{ padding: '1rem 1.5rem', width: '552px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormInput>
                      <Label>Start Date</Label>
                      <FormControl fullWidth variant="standard">
                        <FormikField fieldType={FormikFieldType.TextField} type="date" name="startDate" size="small" />
                      </FormControl>
                    </FormInput>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInput>
                      <Label>End Date</Label>
                      <FormControl fullWidth>
                        <FormikField fieldType={FormikFieldType.TextField} type="date" name="endDate" size="small" />
                      </FormControl>
                    </FormInput>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Label>Status Baca</Label>
                    <FormikField
                      fieldType={FormikFieldType.Select}
                      name="status"
                      placeholder="Pilih Status"
                      size="small"
                      options={statusOption || []}
                    />
                  </Grid>
                  {type == 'Outgoing' && (
                    <Grid item xs={12} md={6}>
                      <Label>Status Surat</Label>
                      <FormikField
                        fieldType={FormikFieldType.Select}
                        name="statusLetter"
                        placeholder="Pilih Status"
                        size="small"
                        options={statusLetter || []}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ padding: '0.25rem 0' }}>
                <Divider />
              </Grid>
              <Grid item xs={12} sx={{ padding: '1rem 1.5rem' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <ButtonPrimary fullWidth variant="contained" type="submit">
                      Simpan
                    </ButtonPrimary>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <ButtonSecondary
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        resetFilter();
                      }}
                    >
                      Reset
                    </ButtonSecondary>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormikForm>
        </FormikProvider>
      </Dialog>
    </>
  );
};

export default memo(FilterWrapper);
