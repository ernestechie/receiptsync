import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography, Box } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

const GoBack = () => {
  const router = useRouter();

  return (
    <Box mb={4} sx={{ maxWidth: 768, mx: 'auto' }}>
      <Stack
        direction='row'
        alignItems='center'
        gap={2}
        sx={{ width: 100, cursor: 'pointer' }}
        onClick={() => router.back()}
      >
        <ArrowBackIosNew fontSize='small' />
        <Typography>Go Back</Typography>
      </Stack>
    </Box>
  );
};

export default GoBack;
