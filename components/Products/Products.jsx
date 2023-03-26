import { Refresh } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import ProductItem from './ProductItem';

const Products = ({ products, sortBy }) => {
  const [max, setMax] = useState(9);

  return (
    <Box>
      {products.length > 0 && (
        <Grid
          container
          mx='auto'
          rowSpacing={{ xs: 2, sm: 2, lg: 2 }}
          columnSpacing={{ sm: 2, md: 2, lg: 2 }}
          columns={12}
          // new Date(b.updatedAt).getTime() -
          // new Date(a.updatedAt).getTime()
          // a.productName.toUpperCase() - b.productName.toUpperCase()
        >
          {[...products]
            .sort((a, b) => {
              switch (sortBy) {
                case 'recently-updated':
                  return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                  );
                case 'date-added-asc':
                  return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                  );
                case 'date-added-desc':
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  );
                case 'name-asc':
                  return a.productName.localeCompare(b.productName);
                case 'name-desc':
                  return b.productName.localeCompare(a.productName);
                default:
                  new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime();
              }
              // return a.productName.localeCompare(b.productName);
            })
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
          sx={{
            display: 'flex',
            mx: 'auto',
            textTransform: 'capitalize',
            mt: 4,
          }}
          startIcon={<Refresh />}
          onClick={() => setMax((prev) => prev + 9)}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default Products;
