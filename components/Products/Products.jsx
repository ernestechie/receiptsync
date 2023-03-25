import { Refresh } from '@mui/icons-material';
import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { Grid, Box, Button } from '@mui/material';

const Products = ({ products }) => {
  const [max, setMax] = useState(10);

  return (
    <Box>
      {products.length > 0 && (
        <Grid
          container
          mx='auto'
          rowSpacing={{ xs: 2, sm: 2, lg: 2 }}
          columnSpacing={{ sm: 2, md: 2, lg: 2 }}
          columns={12}
        >
          {[...products]
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .splice(0, max)
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
      )}

      {products.length > max && (
        <Button
          variant='outlined'
          color='secondary'
          mt={4}
          sx={{ mx: 'auto', textTransform: 'capitalize' }}
          startIcon={<Refresh />}
          onClick={() => setMax((prev) => prev + 10)}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default Products;
