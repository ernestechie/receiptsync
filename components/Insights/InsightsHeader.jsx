import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { FilterList, ArrowDropDown } from '@mui/icons-material';

const InsightsHeader = () => {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      alignItems={{
        xs: 'flex-start',
        sm: 'center',
      }}
      justifyContent={{
        xs: 'center',
        sm: 'space-between',
      }}
      gap={2}
      sx={{
        p: 4,
        mx: 'auto',
        bgcolor: '#fff',
        borderRadius: 2,
        width: '100%',
        maxWidth: 800,
        boxShadow: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)',
        mb: 2,
      }}
    >
      <Typography fontSize={20} fontWeight={700}>
        Review Performance
      </Typography>
      <Button
        variant='text'
        color='secondary'
        disableElevation
        startIcon={<FilterList />}
        endIcon={<ArrowDropDown />}
      >
        Showing Results for: ({'2023'})
      </Button>
    </Stack>
  );
};

export default InsightsHeader;
