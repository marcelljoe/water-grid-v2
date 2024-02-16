// import modules
import React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { SWRConfig } from 'swr/_internal';
import Head from 'next/head';
import nProgress from 'nprogress';

// import material modules
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// import context
import { StoreContextProvider } from '@/context/context';

// import utils
import { createEmotionCache } from '@/utils/createEmotionCache';

// import global styles
import theme from '@/styles/theme';
import '@/styles/globals.css';
import '@/styles/styleP.css';
import '@/styles/responsive.css';

// define page layout
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

// define apps props
export type MyAppProps = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

// define client side cache
const clientSideEmotionCache = createEmotionCache();

// define apps props
const App = (props: MyAppProps) => {
  // desturcturing props
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // define layout component
  const getLayout = Component.getLayout ?? (page => page);

  // define progress routes
  nProgress.configure({ showSpinner: false });
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <SWRConfig value={{ fetcher: url => fetch(url).then(res => res.json()) }}>
      <StoreContextProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {/* <CacheProvider value={emotionCache}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
        {/* </CacheProvider> */}
      </StoreContextProvider>
    </SWRConfig>
  );
};

// export app page
export default App;
