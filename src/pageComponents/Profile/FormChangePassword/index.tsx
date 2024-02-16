import React, { useContext, useEffect, useState } from 'react';
import withAuth from '@/hocs/withAuth';
import LayoutComponent from '@/components/Layout/Layout';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  Typography
} from '@mui/material';
import { StoreContext } from '@/context/context';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';
import useCustomFormik from '@/hooks/useCustomFormik';
import { FormikProvider, Form as FormikForm } from 'formik';
import {
  CustomFormInput as FormInput,
  CustomFormControl as FormControl
} from '@/components/FormControlled/Form.styled';
import { Label } from '../../Template/Form/Form.styled';
import { ButtonPrimary, ButtonSecondary } from '@/components/Button/Button.styled';
import {
  LockOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@mui/icons-material';
import { PropsChangePasswordForm, PropsProfileForm } from '../Profile.types';
import { http } from '@/utils/httpClient';
import profileSchema from '@/lib/validation/profile';
import ConfirmationDialog from '@/components/Dialog/ConfirmationDialog';

const ChangePasswordForm = (props: PropsChangePasswordForm) => {
  const { state, actions } = useContext(StoreContext);
  const { id, handleDialog } = props;
  //show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  //show confirm password
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const submit = async (values: any) => {
    const response = await http.post('/api/setting/users?type=updateProfile', values);
    if (response.data.data.status == 200 || response.data.data.status == 201) {
      formik.resetForm();
      actions.UPDATE_DIALOG({
        ...state.dialog,
        show: true,
        image: '/images/success.png',
        content: 'Berhasil mengubah kata sandi',
        title: 'Sukses',
        type: 'success',
        onClose: () => {
          handleDialog(false);
        }
      });
    } else {
      actions.UPDATE_DIALOG({
        ...state.dialog,
        show: true,
        image: '/images/error.png',
        content: 'Password Tidak Sama, harap masukkan password yang sesuai' || 'Terjadi Kesalahan',
        title: 'Error',
        type: 'error',
        onClose: () => {
          handleDialog(false);
        }
      });
    }
  };

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      id: id || '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: profileSchema,

    onSubmit: async values => {
      submit(values);
    }
  });

  return (
    <React.Fragment>
      <Grid container>
        <FormikProvider value={formik}>
          <FormikForm encType="multipart/form-data">
            <Grid item xs={12} sx={{ padding: '1rem 1.5rem' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormInput>
                    <Label>Kata Sandi</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="password"
                        placeholder="Kata Sandi"
                        size="small"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ marginLeft: '-30px' }}>
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormInput>
                    <Label>Konfirmasi Kata Sandi</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="confirmPassword"
                        placeholder="Konfirmasi Kata Sandi"
                        size="small"
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ marginLeft: '-30px' }}>
                              <IconButton onClick={handleClickShowConfirmPassword}>
                                {showConfirmPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                              </IconButton>
                            </InputAdornment>
                          )
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
                    type="submit"
                    variant="contained"
                    disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                  >
                    Simpan
                  </ButtonPrimary>
                </Grid>
                <Grid item xs={6}>
                  <ButtonSecondary fullWidth variant="outlined" onClick={() => handleDialog(false)}>
                    Batal
                  </ButtonSecondary>
                </Grid>
              </Grid>
            </Grid>
          </FormikForm>
        </FormikProvider>
      </Grid>
      <ConfirmationDialog />
    </React.Fragment>
  );
};

export default ChangePasswordForm;
