import { Grid, Container, Button, Paper, Box, Stack, Avatar, Chip } from '@mui/material';
import React from 'react';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import { DetailInfoList } from './IncomingMail.types';

const DetailInfoList = (props: DetailInfoList) => {
  const { statusLabel, statusType, title, icon, value } = props;

  return (
    <React.Fragment>
      <>
        <Stack direction="row" spacing={2} className="info-list" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: '#F6F7F9', borderRadius: 2 }} variant="square">
              <TagOutlinedIcon sx={{ color: '#A9B2BF' }}></TagOutlinedIcon>
            </Avatar>
            <Box>
              <h6 className="strong">{title}</h6>
              <h6>{value}</h6>
            </Box>
          </Stack>
          <Chip
            label={statusLabel}
            size="small"
            sx={{
              fontSize: 10,
              padding: '0 10px',
              background: '#A9B2BF',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 2
            }}
          />
        </Stack>
      </>
    </React.Fragment>
  );
};

export default DetailInfoList;
