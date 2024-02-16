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
import { PropsProfileForm } from '../Profile.types';
import { http } from '@/utils/httpClient';
import profileSchema from '@/lib/validation/profile';

const ProfileForm = (props: PropsProfileForm) => {
  const { state, actions } = useContext(StoreContext);
  const { handleShowPass, openPassword, value, userLogin } = props;
  //show password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //show confirm password
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const submit = async (values: any) => {
    const response = await http.post('/api/setting/users?type=updateProfile', values);
  };

  const formik = useCustomFormik({
    enableReinitialize: true,
    initialValues: {
      id: value?.id || '',
      oldUsername: value?.username || '',
      username: value?.username || '',
      password: '',
      confirmPassword: '',
      employeeId: value?.employeeId || '',
      roleId: value?.accessId || ''
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
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Nama</Label>
                    <Typography>{userLogin?.name || '-'}</Typography>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>NIP</Label>
                    <Typography>{userLogin?.nip || '-'}</Typography>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Posisi</Label>
                    <Typography>{userLogin?.position || '-'}</Typography>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Seksi</Label>
                    <Typography>{userLogin?.section || '-'}</Typography>
                  </FormInput>
                </Grid>
                {/* <Grid item xs={12} md={12}>
                  <FormInput>
                    <Label>Username</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="username"
                        placeholder="Nomor Surat"
                        size="small"
                        type="text"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlined />
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Password</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="password"
                        placeholder="Password"
                        size="small"
                        type="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ marginLeft: '-30px' }}>
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </FormInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormInput>
                    <Label>Konfirmasi Password</Label>
                    <FormControl fullWidth>
                      <FormikField
                        fieldType={FormikFieldType.TextField}
                        name="confirmPassword"
                        placeholder="Konfirmasi Password"
                        size="small"
                        type="password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end" sx={{ marginLeft: '-30px' }}>
                              <IconButton onClick={handleClickShowConfirmPassword}>
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                  </FormInput>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ padding: '0.25rem 0' }}>
              <Divider />
            </Grid>
            {/* <Grid item xs={12} sx={{ padding: '1rem 1.5rem' }}>
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
                  <ButtonSecondary fullWidth variant="outlined">
                    Batal
                  </ButtonSecondary>
                </Grid>
              </Grid>
            </Grid> */}
          </FormikForm>
        </FormikProvider>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileForm;
