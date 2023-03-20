import React from 'react';
import ProductItem from './ProductItem';
import { Grid } from '@mui/material';

const Products = ({ products }) => {
  return (
    <Grid
      container
      mx='auto'
      rowSpacing={{ xs: 2, sm: 2, lg: 2 }}
      columnSpacing={{ sm: 2, md: 2, lg: 2 }}
      columns={12}
    >
      {[...products]
        .sort((a, b) => b.dateAdded - a.dateAdded)
        .map((product) => (
          <Grid
            item
            key={product._id}
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            width='100%'
          >
            <ProductItem product={product} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Products;
