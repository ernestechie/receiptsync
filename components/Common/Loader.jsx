import React from 'react';
import Image from 'next/image';
import spinnerSvg from '../../assets/spinner.svg';
import { Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'rgb(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={spinnerSvg}
        height={100}
        width={100}
        alt='Loading spinner svg'
        priority
      />
    </Box>
  );
};

export default Loader;
