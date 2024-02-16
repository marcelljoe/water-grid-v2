// import modules
import React from 'react';
import { Field } from 'formik';
import Image from 'next/image';

// import MUI components
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

// import MUI icons
import LockOutlined from '@mui/icons-material/LockOutlined';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

// import interfaces
import { PropsResetForm } from './Forgot.types';

// import components
import TextField from '@/components/FormControlled/Formik/TextField';

// import styles
import { ButtonPrimary } from '@/components/Button/Button.styled';
import { CustomFormControl, CustomFormInput } from '@/components/FormControlled/Form.styled';
import {
  ForgotCard,
  ForgotCardContent,
  ForgotCardFooter,
  ForgotCardHeader,
  ForgotHeaderText,
  ForgotHeaderTitle,
  FormContent,
  FormHeader
} from './Forgot.styled';

const ResetForm = (props: PropsResetForm) => {
  // destructuring props
  const { openPassword, openConfirmPassword, handleShowPass, handleShowConfirmPass, isSubmitting, isValid, dirty } =
    props;
  return (
    <ForgotCard>
      <ForgotCardHeader>
        <Image src={'/images/logo.png'} alt="Logo Image" height={80} width={120} />
      </ForgotCardHeader>
      <ForgotCardContent>
        <FormHeader>
          <ForgotHeaderTitle>Reset Password</ForgotHeaderTitle>
          <ForgotHeaderText>Please enter your new password</ForgotHeaderText>
        </FormHeader>
        <FormContent>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <Field
                component={TextField}
                type={openPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPass}>
                        {openPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </CustomFormControl>
          </CustomFormInput>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <Field
                component={TextField}
                type={openConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowConfirmPass}>
                        {openConfirmPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </CustomFormControl>
          </CustomFormInput>
        </FormContent>
      </ForgotCardContent>
      <ForgotCardFooter>
        <ButtonPrimary fullWidth variant="contained" type="submit" disabled={isSubmitting || !isValid || !dirty}>
          Submit
        </ButtonPrimary>
      </ForgotCardFooter>
    </ForgotCard>
  );
};

export default ResetForm;
