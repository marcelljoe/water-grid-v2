// import modules
import React, { useContext, useEffect } from 'react';
import Head from 'next/head';

// import components
import LayoutComponent from '@/components/Layout/Layout';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import withAuth from '@/hocs/withAuth';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { getLoginSession } from '@/lib/auth';
import { StoreContext } from '@/context/context';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import * as WebServices from '../api/webservices';

interface MediaProps {
  loading?: boolean;
  links: any;
  divisions: any;
}

// define DashboardPage
const DashboardPage = (props: MediaProps) => {
  const { state, actions } = useContext(StoreContext);

  useEffect(() => {
    let temp = props.links;
    actions.UPDATE_LINK_DISPLAY({ ...state.links, data: temp.filter((x: any) => x.divId === state.links.preset) });
  }, []);

  useEffect(() => {
    let temp = props.links;
    actions.UPDATE_LINK_DISPLAY({
      ...state.links,
      data: temp.filter(
        (x: any) => x.name.toLowerCase().indexOf(state.links.key.toLowerCase()) > -1 && x.divId === state.links.preset
      )
    });
  }, [state.links.key, state.links.preset]);

  return (
    <LayoutComponent>
      <React.Fragment>
        <Head>
          <title>Dashboard | Integration Services</title>
        </Head>
        <Box className="head-moment">
          <h2 title="TEST" className="align-month">
            Semua Divisi
          </h2>
        </Box>
        <Box sx={{ flexGrow: 2 }}>
          {props.divisions.map((data: any) => (
            <Button
              style={{
                backgroundColor: state.links.preset === data.id ? '#01C1FF' : '#F0F1F4',
                color: state.links.preset === data.id ? '#FFF' : '#A5AEBC',
                borderRadius: '5em',
                width: 'fit-content',
                whiteSpace: 'nowrap',
                margin: '0.3em 0.5em 0.3em 0.5em'
              }}
              key={data.id}
              variant="contained"
              onClick={() => actions.UPDATE_LINK_DISPLAY({ ...state.links, preset: data.id })}
            >
              {data.name}
            </Button>
          ))}
          <Grid className="row-menu" container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 12 }}>
            <div className="grids">
              {state.links.data.map((data: any) => (
                <ListItem key={data.id} style={{ maxWidth: 360 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 84, height: 84 }} src={data.img_url} variant={'rounded'} />
                  </ListItemAvatar>
                  <ListItemText
                    style={{ paddingLeft: '1em' }}
                    primary={
                      <React.Fragment>
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {data.name}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {data.description}
                        </Typography>
                        <br />
                        <Button size="small" target="_blank" href={data.url} style={{ padding: '0 0 0 0' }}>
                          Buka Situs
                        </Button>
                      </React.Fragment>
                    }
                  />
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
  const divisions = await WebServices.getDivisions(context.req as NextApiRequest, context.res as NextApiResponse);

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
      links: links,
      divisions: divisions
    }
  };
};

export default withAuth(DashboardPage);
