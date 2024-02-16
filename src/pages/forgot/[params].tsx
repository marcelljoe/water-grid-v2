// import modules
import React from 'react';
import { Formik } from 'formik';
import { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// import styles
import { ForgotBox } from '@/pageComponents/Forgot/Forgot.styled';
import { PageContainer } from '@/components/Container/Container.styled';

// import interfaces
import { ResetInitialValue } from '@/pageComponents/Forgot/Forgot.types';

// import context
import { StoreContext } from '@/context/context';

// import validation
import { resetSchema } from '@/lib/validation';

// import components
const SnackbarComponent = dynamic(() => import('@/components/Snackbar'), { ssr: false });
import ResetForm from '@/pageComponents/Forgot/ResetForm';

// define SSR
export const getServerSideProps: GetServerSideProps = async context => {
  const pageRequest = context.req as NextApiRequest;
  return {
    props: {}
  };
};

// define ResetPage
const ResetPage: NextPage = () => {
  // define router
  const router = useRouter();

  // define showPassword State
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  // define context
  const { state, actions } = React.useContext(StoreContext);

  // define initialValue
  const initialValues: ResetInitialValue = {
    password: '',
    confirmPassword: ''
  };

  // define handleShowPassword
  const handleShowPassword = () => {
    setShowPassword(open => !open);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(open => !open);
  };

  // define handleSubmit
  const handleSubmit = () => {};
  return (
    <React.Fragment>
      <Head>
        <title>Reset Password | E-Office Web Apps</title>
      </Head>
      <PageContainer>
        <Formik initialValues={initialValues} validationSchema={resetSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid, dirty }) => (
            <ForgotBox>
              <ResetForm
                openPassword={showPassword}
                openConfirmPassword={showConfirmPassword}
                handleShowPass={handleShowPassword}
                handleShowConfirmPass={handleShowConfirmPassword}
                isSubmitting={isSubmitting}
                isValid={isValid}
                dirty={dirty}
              />
            </ForgotBox>
          )}
        </Formik>
      </PageContainer>
      <SnackbarComponent />
    </React.Fragment>
  );
};

// export ResetPage
export default ResetPage;
