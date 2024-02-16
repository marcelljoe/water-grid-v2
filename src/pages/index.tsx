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
        <title>E-Office Web Apps</title>
        <meta name="description" content="E-Office Web Apps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <h1>Welcome to E-Office Web Apps</h1>
      </PageContainer>
    </React.Fragment>
  );
};

export default HomePage;
