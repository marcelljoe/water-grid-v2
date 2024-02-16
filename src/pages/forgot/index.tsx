// import modules
import React from 'react';
import { Formik } from 'formik';
import { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// import styles
import { ForgotBox } from '@/pageComponents/Forgot/Forgot.styled';
import { AuthPageContainer as PageContainer } from '@/components/Container/Container.styled';

// import interfaces
import { ForgotInitialValue } from '@/pageComponents/Forgot/Forgot.types';

// import context
import { StoreContext } from '@/context/context';

// import validation schema
import { forgotSchema } from '@/lib/validation';

// import components
import ForgotForm from '@/pageComponents/Forgot/Form';
const SnackbarComponent = dynamic(() => import('@/components/Snackbar'), { ssr: false });

// define SSR
export const getServerSideProps: GetServerSideProps = async context => {
  const pageRequest = context.req as NextApiRequest;
  return {
    props: {}
  };
};

// define ForgotPage
const ForgotPage: NextPage = () => {
  // define router
  const router = useRouter();

  // define initialValues
  const initialValues: ForgotInitialValue = {
    email: ''
  };

  // define context
  const { state, actions } = React.useContext(StoreContext);

  // define handleLogin
  const handleLogin = () => {
    router.push('/login');
  };

  // define handleSubmit
  const handleSubmit = () => {};
  return (
    <React.Fragment>
      <Head>
        <title>Forgot Password | E-Office Web Apps</title>
      </Head>
      <PageContainer>
        <Formik initialValues={initialValues} validationSchema={forgotSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid, dirty }) => (
            <ForgotBox>
              <ForgotForm handleLogin={handleLogin} isSubmitting={isSubmitting} isValid={isValid} dirty={dirty} />
            </ForgotBox>
          )}
        </Formik>
      </PageContainer>
      <SnackbarComponent />
    </React.Fragment>
  );
};

export default ForgotPage;
