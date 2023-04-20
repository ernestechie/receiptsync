import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import StatCard from './StatCard';

const StatCards = () => {
  const {
    entities: {
      vendor: { data: vendorData },
      products: { products, loading },
    },
  } = useSelector((state) => state);

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
            value={7812271007}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Sales'
            param='Today'
            money={true}
            value={20244627}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Orders'
            param='Today'
            money={false}
            value={1007}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} width='100%'>
          <StatCard
            primary={false}
            border={true}
            title='Products'
            param='Current'
            money={false}
            value={loading ? 'Loading...' : products?.length}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatCards;
