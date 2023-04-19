import React from 'react';
import StatCard from './StatCard';
import { Grid, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const StatCards = () => {
  const {
    entities: {
      vendor: { data: vendorData },
      products: { products },
    },
  } = useSelector((state) => state);

  console.log(products);

  return (
    <Box sx={{ mx: 'auto !important', maxWidth: 1024 }}>
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
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Products'
            param='Current'
            money={false}
            value={products?.length}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatCards;
