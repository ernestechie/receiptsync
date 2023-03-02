import React from 'react';
import StatCard from './StatCard';
import { Grid, Box, Typography } from '@mui/material';

const StatCards = () => {
  return (
    <Box>
      <Typography fontSize={20} fontWeight={500} mb={2}>
        Business Overview
      </Typography>
      <Grid
        container
        mx='auto'
        rowSpacing={{ xs: 2, sm: 2, lg: 2 }}
        columnSpacing={{ sm: 2, md: 2, lg: 2 }}
        columns={12}
      >
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={true}
            border={false}
            title='Portfolio'
            param='All Time'
            money={true}
            value={147598623}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Sales'
            param='Today'
            money={true}
            value={7812275}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Orders'
            param='Today'
            money={false}
            value={12}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Customers'
            param='This Week'
            money={false}
            value={2}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default StatCards;
