import React from 'react';
import Image from 'next/image';
import spinnerSvg from '../../assets/spinner.svg';
import { Box } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',

        '& img': {
          opacity: 0.8,
        },
      }}
    >
      <Image
        src={spinnerSvg}
        height={80}
        width={80}
        alt='Loading spinner svg'
        priority
      />
    </Box>
  );
};

export default Spinner;
