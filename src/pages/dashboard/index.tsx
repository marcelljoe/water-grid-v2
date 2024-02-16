// import modules
import React, { StrictMode, useState } from 'react';
import Head from 'next/head';

// import components
import LayoutComponent from '@/components/Layout/Layout';
import Box from '@mui/material/Box';
import AreaChartSpark from '@/components/Chart/DashboardChart';
import PieChart from '@/components/Chart/PieChart';
import { Card, Grid, Stack } from '@mui/material';
import withAuth from '@/hocs/withAuth';
import IsCalendar from '@/components/Calendar';
import dayjs from 'dayjs';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@/lib/auth';
import { mailService } from '@/lib/services';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import * as WebServices from '../api/webservices';

const getTahunBulan = dayjs().format('MMMM');

interface MediaProps {
  loading?: boolean;
  links: any;
}

// define DashboardPage
const DashboardPage = (props: MediaProps) => {
  const links = props.links;
  console.log(links);
  return (
    <LayoutComponent>
      <React.Fragment>
        <Head>
          <title>Dashboard | Web Services</title>
        </Head>
        <Box className="head-moment">
          <h2 title="TEST" className="align-month">
            Web Services
            {/* <span>
              <span>{getTahunBulan}</span>
            </span> */}
          </h2>
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          <Grid className="row-menu" container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 12 }}>
            {/* <List sx={{ width: '100%' }} component={Stack} justifyContent="center" direction={"row"} spacing={{ xs: 1, sm: 2, md: 4 }}> */}
            {/* <Grid item xs={12} sm={4} md={4}> */}
            <div className="grids">
              {links.map((data: any) => (
                <ListItem key={data.id}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 56, height: 56 }} src={data.img_url} />
                  </ListItemAvatar>
                  <ListItemText primary={data.name} secondary={data.description} />
                </ListItem>
              ))}
            </div>
          </Grid>
        </Box>
      </React.Fragment>
    </LayoutComponent>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  // check session is valid
  const session = await getLoginSession(context.req as NextApiRequest);
  const links = await WebServices.getWebServices(context.req as NextApiRequest, context.res as NextApiResponse);

  if (!session?.session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
      links: links
    }
  };
};

export default withAuth(DashboardPage);
