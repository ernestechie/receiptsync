import React from 'react';
import { Box } from '@mui/material';

const Padding = ({ children }) => {
  return (
    <Box
      sx={{
        padding: {
          xs: '2rem 1rem',
          sm: '3rem 2rem',
          lg: '4rem 3rem',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Padding;
