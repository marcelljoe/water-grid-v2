import { Divider, TextField as UploadField } from '@mui/material';
import { Grid } from '@mui/material';
import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { Label } from '../Template/Form/Form.styled';
import { PropsIncomingMailForm } from './IncomingMail.types';
import React, { useContext } from 'react';
import { ButtonPrimary, ButtonSecondary } from '@/components/Button/Button.styled';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';
import useCustomFormik from '@/hooks/useCustomFormik';
import IncomingMailSchema from '@/lib/validation/createIncomingMail';
import { FormikProvider, Form as FormikForm } from 'formik';
import axios from 'axios';
import { mutate } from 'swr';
import { StoreContext } from '@/context/context';
import dayjs from 'dayjs';

const IncomingMailForm = (props: PropsIncomingMailForm) => {
  const { handleClose } = props;
  const { state, actions } = useContext(StoreContext);

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      letterNumber: '',
      letterDate: '',
      regarding: '',
      letterFrom: '',
      letterDescription: '',
      files: []
    },
    validationSchema: IncomingMailSchema,

    onSubmit: async values => {
      const formData = new FormData();
      formData.append('id', values.id);
      formik.values.files.forEach((item: any, i) => formData.append('file', item));
      formData.append('doc_date', dayjs(values.letterDate).format('YYYY-MM-DD HH:mm:ss'));
      formData.append('doc_no', values.letterNumber);
      formData.append('description', values.letterDescription);
      formData.append('doc_from', values.letterFrom);
      formData.append('regard', values.regarding);
      formData.append('type', '2');

      const response = await axios.post('/api/upload', formData);
      if (response.data.message == 'success') {
        mutate(
          `/api/mail/inbox_external?rowPerPage=${state.pagination.rowPerPage}&column=${state.filter.column}&direction=${state.filter.direction}&page=${state.pagination.currentPage}&key=${state.filter.key}&status=${state.filter.status}&startDate=${state.filter.startDate}&endDate=${state.filter.endDate}`
        );
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/success.png',
          content: 'Surat Berhasil Tersimpan',
          title: 'Sukses',
          type: 'success'
        });
        handleClose();
        formik.resetForm();
      } else {
        actions.UPDATE_DIALOG({
          ...state.dialog,
          show: true,
          image: '/images/error.png',
          content: 'Nomor Dokumen Sudah Terdaftar',
          title: 'Error',
          type: 'error'
        });
      }
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const validFiles = Array.from(files);
      formik.setFieldValue('files', [...formik.values.files, ...validFiles]);
    }
  };

  const onSubmitForm = () => {
    actions.UPDATE_DIALOG({
      ...state.dialog,
      show: true,
      image: '/images/mail_ask.png',
      content: 'Apakah anda yakin ?',
      title: 'Konfirmasi',
      type: 'confirmation',
      onOk: () => {
        formik.submitForm();
      }
    });
  };

  return (
    <React.Fragment>
      <Grid container>
        <FormikProvider value={formik}>
          <FormikForm encType="multipart/form-data">
            <Grid item xs={12} sx={{ padding: '1rem 1.5rem' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Nomor Surat</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="letterNumber"
                        placeholder="Nomor Surat"
                        size="small"
                        type="text"
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Tanggal Surat</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="letterDate"
                        placeholder="Tanggal Surat"
                        size="small"
                        type="date"
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormInput>
                    <Label>Perihal</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextArea}
                        name="regarding"
                        placeholder="Perihal"
                        size="small"
                        rows={3}
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormInput>
                    <Label>Asal Surat</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        type="text"
                        name="letterFrom"
                        placeholder="Asal Surat"
                        size="small"
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormInput>
                    <Label>Deskripsi Surat</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextArea}
                        name="letterDescription"
                        placeholder="Deskripsi Surat"
                        size="small"
                        rows={3}
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12}>
                  <FormInput>
                    <Label>Attachment</Label>
                    <FormControl fullWidth>
                      <UploadField
                        id="files"
                        name="files"
                        type="file"
                        onChange={handleFileChange}
                        inputProps={{
                          multiple: true,
                          accept: 'image/*, application/pdf',
                          sx: {
                            fontSize: '0.75rem',
                            fontFamily: 'inherit',
                            fontWeight: '500',
                            padding: '0.8rem',
                            color: '#536580',
                            '&::placeholder': {
                              color: '#536580'
                            },

                            '&[type=number]': {
                              MozAppearance: 'textfield'
                            },

                            '&::-webkit-outer-spin-button': {
                              WebkitAppearance: 'none',
                              margin: 0
                            },
                            '&::-webkit-inner-spin-button': {
                              WebkitAppearance: 'none',
                              margin: 0
                            },
                            '&::-webkit-datetime-edit': {
                              marginTop: '-5px'
                            },
                            '&[type=file]': {
                              marginTop: '-5px',
                              padding: '1rem 0.8rem'
                            },
                            '&::file-selector-button': {
                              marginTop: '2px'
                            }
                          }
                        }}
                        InputProps={{
                          sx: {
                            background: '#F8F9FD',
                            borderRadius: '0.75rem',
                            '&.MuiOutlinedInput-root': {
                              paddingRight: '0',
                              '& fieldset': {
                                border: '1px solid #EFF1F4'
                              },
                              '&:hover fieldset': {
                                border: '1px solid #536580'
                              },
                              '&.Mui-focused fieldset': {
                                border: '1px solid #01C3FF'
                              }
                            }
                          }
                        }}
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
                <Grid item xs={6}>
                  <ButtonPrimary
                    fullWidth
                    onClick={onSubmitForm}
                    variant="contained"
                    disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                  >
                    Simpan
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={6}>
                  <ButtonSecondary
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Batal
                  </ButtonSecondary>
                </Grid>
              </Grid>
            </Grid>
          </FormikForm>
        </FormikProvider>
      </Grid>
    </React.Fragment>
  );
};

export default IncomingMailForm;
