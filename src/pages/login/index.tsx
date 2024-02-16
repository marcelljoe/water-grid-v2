import React, { useEffect } from 'react';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import getRawBody from 'raw-body';
import { Field, FormikProvider, useFormik } from 'formik';
import { http } from '@/utils/httpClient';
import { getLoginSession, setLoginSession } from '@/lib/auth';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { MobileStepper, Container, Grid, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { PersonOutlined, LockOutlined, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import TextField from '@/components/Form/TextField';
const SnackbarComponent = dynamic(() => import('@/components/Snackbar'), { ssr: false });
import { ISession } from '@/lib/interfaces/common';
import { LoginInitialValue } from '@/pageComponents/Login/Login.types';
import { AuthPageBackground, AuthPageContainer as PageContainer } from '@/components/Container/Container.styled';
import { CustomFormInput, CustomFormControl } from '@/components/FormControlled/Form.styled';
import { ButtonLogin } from '@/components/Button/Button.styled';

import {
  FooterContent,
  FormContent,
  FormHeader,
  LoginCardContent,
  LoginCardFooter,
  LoginHeaderText,
  LoginHeaderTitle,
  LoginRedirect
} from '@/pageComponents/Login/Login.styled';
import { loginSchema } from '@/lib/validation';
import { sessionService } from '@/lib/services';

import { firebaseCloudMessaging } from '@lib/firebase/firebase';

interface LoginPageProps {
  login: boolean;
  path: string;
}

const images = [
  {
    title: 'Selamat Datang',
    label:
      'Aplikasi eOffice digunakan untuk membantu kegiatan surat menyurat yang memudahkan proses administrasi secara digitalisasi di lingkungan Kantor Perumda Tirta Benteng',
    imgPath: '/images/welcome.png'
  },
  {
    title: 'Fitur eOffice',
    label: 'Surat Masuk Internal/Eksternal, Surat Keluar Internal/Eksternal, Disposisi Surat, Agenda, dll.',
    imgPath: '/images/fitur.png'
  }
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const LoginPage: React.FC<LoginPageProps> = props => {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [tokenFB, setTokenFB] = React.useState<any>(undefined);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleShowPassword = () => {
    setShowPassword(open => !open);
  };

  const handleForgot = () => {
    router.push('/forgot');
  };

  useEffect(() => {
    if (props.login) {
      router.push({
        pathname: props.path
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    } as LoginInitialValue,
    validationSchema: loginSchema,
    onSubmit: async (values): Promise<void> => {
      // try {
      //   console.log(values)
      //   const res = await fetch('/api/auth/login', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(values),
      //   })
      //   if (res.status === 200) {
      //     router.push('/login/redirect')
      //   } else {
      //     throw new Error(await res.text())
      //   }
      // } catch (error) {
      //   if (error instanceof Error) {
      //     console.error('An unexpected error happened occurred:', error)
      //     alert(error.message)
      //   }
      // }
    }
  });

  useEffect(() => {
    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {});
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          setTokenFB(token);
        }
      } catch (error) {}
    }

    setToken();
  }, []);

  if (props.login) {
    return <></>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Login | E-Office Web Apps</title>
      </Head>
      <PageContainer>
        <AuthPageBackground>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </AuthPageBackground>

        <Container maxWidth="md" sx={{ padding: '0 !important' }}>
          <Grid
            container
            // sx={{
            //   border: 'none',
            //   boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 5px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
            // }}
            justifyContent={'center'}
          >
            {/* <Grid
              item
              xs={0}
              sm={0}
              md={5.75}
              sx={{
                padding: '2rem',
                background: '#F8F9FD',
                borderRadius: '0.625rem 0 0 0.625rem',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Grid container sx={{ gap: '3rem' }}>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                  <Image src={'/images/logo.png'} alt="Logo Image" height={30} width={50} priority />
                  <Typography sx={{ fontWeight: '600', fontSize: '0.75rem', color: '#536580' }}>
                    E-Office Web App
                    <Typography component="span" sx={{ fontSize: '0.75rem' }}>
                      {' '}
                      Tirta Benteng
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <AutoPlaySwipeableViews
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {images.map((step, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '0 1.5rem'
                        }}
                      >
                        <img src={step.imgPath} alt="Logo Image" width={220} />
                        <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', color: '#536580' }}>
                          {step.title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#A5AEBC' }}>{step.label}</Typography>
                      </Box>
                    ))}
                  </AutoPlaySwipeableViews>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0 1.5rem'
                  }}
                >
                  <MobileStepper
                    variant="dots"
                    steps={images.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 400, flexGrow: 1, background: 'inherit' }}
                    backButton={undefined}
                    nextButton={undefined}
                  />
                </Grid>
              </Grid>
            </Grid> */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6.25}
              sx={{
                padding: '2rem 4rem',
                background: '#FFF',
                borderRadius: '0.625rem',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ padding: '1em 0 1em 0' }}>
                <Image src={'/images/logo.png'} alt="Logo Image" height={50} width={50} priority />
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                  <Typography sx={{ fontWeight: '600', fontSize: '0.75rem', color: '#536580' }}>
                    E-Office Web App
                    <Typography component="span" sx={{ fontSize: '0.75rem' }}>
                      {' '}
                      Tirta Benteng
                    </Typography>
                  </Typography>
                </Grid>
              </div>
              <FormikProvider value={formik}>
                <form method="post">
                  <LoginCardContent>
                    <FormHeader sx={{ alignItems: 'start' }}>
                      <LoginHeaderTitle>Login</LoginHeaderTitle>
                      <LoginHeaderText sx={{ fontWeight: '400' }}>
                        Silakan gunakan nomor HP/NIK Anda untuk masuk
                      </LoginHeaderText>
                    </FormHeader>
                    <FormContent>
                      <Field component={TextField} name="tokenFB" value={tokenFB} style={{ display: 'none' }} />
                      <CustomFormInput>
                        <CustomFormControl fullWidth>
                          <Field
                            component={TextField}
                            type="text"
                            name="username"
                            placeholder="Username"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonOutlined />
                                </InputAdornment>
                              )
                            }}
                          />
                        </CustomFormControl>
                      </CustomFormInput>
                      <CustomFormInput>
                        <CustomFormControl fullWidth>
                          <Field
                            component={TextField}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="password-field"
                            placeholder="Password"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockOutlined />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton style={{ marginLeft: -30 }} onClick={handleShowPassword}>
                                    {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </CustomFormControl>
                      </CustomFormInput>
                    </FormContent>
                    <FormContent>
                      <LoginRedirect onClick={handleForgot}>Forgot Password?</LoginRedirect>
                    </FormContent>
                  </LoginCardContent>
                  <LoginCardFooter>
                    <FooterContent>
                      <ButtonLogin
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                      >
                        Log in
                      </ButtonLogin>
                    </FooterContent>
                  </LoginCardFooter>
                </form>
              </FormikProvider>
            </Grid>
          </Grid>
        </Container>
      </PageContainer>
      <SnackbarComponent />
    </React.Fragment>
  );
};

// define SSR
export const getServerSideProps: GetServerSideProps = async context => {
  if (context.req.method === 'POST') {
    const bufferBody = await getRawBody(context.req);
    const body = new URLSearchParams(bufferBody.toString() as string);

    const response = await http
      .post(`/api/auth/login`, {
        username: body.get('username') || '',
        password: body.get('password') || '',
        mediaCode: '400'
        // device: {
        //   firebase_id: body.get('tokenFB') || ''
        // }
      })
      .catch(err => err);

    const token = response.data?.data;

    if (token) {
      await setLoginSession(context.res as NextApiResponse, token);
      const path = await sessionService.getFirstMenu(token);
      return {
        props: {
          login: true,
          path
        }
      };
    }
  }

  const session: ISession | undefined = await getLoginSession(context.req as NextApiRequest);
  if (session?.session) {
    const path = await sessionService.getFirstMenu(session.session);

    if (typeof path == 'string') {
      return {
        redirect: {
          destination: path,
          permanent: false
        },
        props: {}
      };
    }
  }

  return {
    props: {}
  };
};

export default LoginPage;
