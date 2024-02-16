import { useContext } from 'react';
import { Dialog, Grid, DialogTitle, IconButton, Divider } from '@mui/material';
import { StoreContext } from '@/context/context';
import React from 'react';
import useCustomFormik from '@/hooks/useCustomFormik';
import { FormikProvider, Form as FormikForm, Field } from 'formik';
import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { Label } from '@/pageComponents/Template/Form/Form.styled';
import TextField from './FormControlled/Formik/TextField';
import SelectComponent from './FormControlled/Formik/Select';
import { ButtonPrimary, ButtonSecondary } from './Button/Button.styled';
import CloseIcon from '@mui/icons-material/Close';

interface ModalFunction {
  handleClose: () => void;
  handleOpen: () => void;
  openModal: boolean;
}

const statusOption = [
  {
    id: 1,
    label: 'Active',
    value: 1
  },
  {
    id: 2,
    label: 'Inactive',
    value: 2
  }
];
const DialogDisposisi = (props: ModalFunction) => {
  const { state, actions } = useContext(StoreContext);
  const { handleClose, handleOpen, openModal } = props;

  let formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      status: '',
      startDate: '',
      endDate: ''
    },

    onSubmit: values => {
      actions.UPDATE_FILTER({
        ...state.filter,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status
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
      status: ''
    });
    handleClose();
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: '0.75rem', background: '#FFF' } }}
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
              <Grid item xs={12} sx={{ padding: '1rem 1.5rem' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormInput>
                      <Label>Start Date</Label>
                      <FormControl fullWidth variant="standard">
                        <Field
                          component={TextField}
                          type="date"
                          name="startDate"
                          value={formik.values.startDate}
                          size="small"
                        />
                      </FormControl>
                    </FormInput>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInput>
                      <Label>End Date</Label>
                      <FormControl fullWidth>
                        <Field
                          type="date"
                          component={TextField}
                          name="endDate"
                          size="small"
                          value={formik.values.endDate}
                        />
                      </FormControl>
                    </FormInput>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormInput>
                      <Label>Status</Label>
                      <FormControl fullWidth>
                        <Field
                          component={SelectComponent}
                          name="status"
                          placeholder="Pilih Status"
                          size="small"
                          options={statusOption || []}
                          value={formik.values.status}
                        />
                      </FormControl>
                    </FormInput>
                  </Grid>
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

export default DialogDisposisi;
