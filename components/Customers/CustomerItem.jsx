import { Grid, Typography, Stack } from '@mui/material';
import React from 'react';
import { parseDate } from '../../utils/parseDate';
import { theme as CustomTheme } from '../../pages/_app';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from '@mui/icons-material';

const CustomerItem = (props) => {
  return (
    <Grid
      container
      mx='auto'
      // rowSpacing={{ xs: 1, sm: 2, md: 0 }}
      columnSpacing={{ sm: 1 }}
      columns={12}
      sx={{
        my: 2,
        py: 3,
        px: 4,
        minHeight: '80px',
        bgcolor: '#fff',
        borderRadius: '8px',
        transition: '0.3s ease-in',
        border: '1px solid #fff',
        alignItems: 'center',
        mx: 'auto !important',
        maxWidth: 768,
        position: 'relative',

        '&:hover': {
          border: `1px solid ${CustomTheme.palette.secondary.contrastText}`,
          transition: '0.3s ease-out',

          '& .delete-icon': {
            borderTop: {
              md: `1px solid ${CustomTheme.palette.secondary.contrastText}`,
            },
            borderRight: {
              md: `1px solid ${CustomTheme.palette.secondary.contrastText}`,
            },
          },
        },
      }}
    >
      <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
        <Typography fontSize={16} fontWeight={700}>
          {'Isaiah Ernest'}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
        <Typography
          fontWeight={500}
          color='secondary.contrastText'
          sx={{ textAlign: { xs: 'right', sm: 'left' } }}
          fontSize={14}
        >
          {'Jan 23, 2022'}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
        <Typography fontWeight={500} color='secondary.contrastText'>
          {'09055355357'}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={{ xs: 'flex-end', sm: 'flex-start', md: 'flex-end' }}
          gap={2}
        >
          <IconButton aria-label='edit customer' color='secondary' size='small'>
            <Edit size='inherit' />
          </IconButton>
          <IconButton
            aria-label='delete customer'
            color='custom'
            className='delete-icon'
            sx={{
              position: { md: 'absolute' },
              right: -21,
              background: '#fff',
              border: '1px solid #fff',
              transition: '0.3s ease-in',
              transform: 'rotate(45deg)',

              '&:hover': {
                background: '#fff',
                transition: '0.3s ease-out',
              },
            }}
          >
            <Delete sx={{ transform: 'rotate(-45deg)' }} />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CustomerItem;
