import React from 'react';
import { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import Head from 'next/head';
import { PageContainer } from '@components/Container/Container.styled';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {}
  };
};

const HomePage: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>WebServices Web Apps</title>
        <meta name="description" content="WebServices Web Apps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <h1>Welcome to WebServices Web Apps</h1>
      </PageContainer>
    </React.Fragment>
  );
};

export default HomePage;
