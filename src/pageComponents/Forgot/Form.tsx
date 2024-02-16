import React from 'react';
import { Field } from 'formik';
import Image from 'next/image';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutline from '@mui/icons-material/MailOutline';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { PropsForgotForm } from './Forgot.types';
import TextField from '@/components/FormControlled/Formik/TextField';

// import styles
import { ButtonPrimary, ButtonSecondary } from '@/components/Button/Button.styled';
import { CustomFormControl, CustomFormInput } from '@/components/FormControlled/Form.styled';
import {
  ForgotCard,
  ForgotCardContent,
  ForgotCardFooter,
  ForgotCardHeader,
  ForgotHeaderTitle,
  ForgotHeaderText,
  FormContent,
  FormHeader
} from './Forgot.styled';
import FormikField, { FormikFieldType } from '@/components/FormControlled/FormikField';

const ForgotForm = (props: PropsForgotForm) => {
  // destructuring props
  const { handleLogin, isSubmitting, isValid, dirty } = props;

  return (
    <ForgotCard>
      <ForgotCardHeader>
        <Image src={'/images/logo.png'} alt="Logo Image" height={80} width={120} />
      </ForgotCardHeader>
      <ForgotCardContent>
        <FormHeader>
          <ForgotHeaderTitle>Forgot Password</ForgotHeaderTitle>
          <ForgotHeaderText>
            Please enter the registered email. We will send you a verification code to reset your password.
          </ForgotHeaderText>
        </FormHeader>
        <FormContent>
          <CustomFormInput>
            <CustomFormControl fullWidth variant="standard">
              <Field
                component={TextField}
                type="text"
                name="email"
                placeholder="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline />
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
        <ButtonSecondary onClick={handleLogin}>
          <ChevronLeft />
          Back to login
        </ButtonSecondary>
      </ForgotCardFooter>
    </ForgotCard>
  );
};

export default ForgotForm;
