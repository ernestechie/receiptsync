import { Stack, Typography } from '@mui/material';
import React from 'react';
import { ButtonContained } from '../../ReceiptSyncButtons';

const ReceiptDetailsNav = (props) => {
  return (
    <Stack
      sx={{
        p: 4,
        mx: 'auto',
        bgcolor: '#fff',
        borderRadius: 2,
        width: '100%',
        maxWidth: 768,
      }}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
    >
      <Stack
        direction={{ xs: 'row', sm: 'column' }}
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        justifyContent={{
          xs: 'space-between',
          sm: 'space-between',
        }}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        <Typography fontSize={20} mb={{ xs: 0, sm: 0, md: 1 }} fontWeight={700}>
          #{props.number}
        </Typography>
        <Typography fontWeight={500} color='secondary.contrastText'>
          {props.narration}
        </Typography>
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        sx={{
          display: { xs: 'none', sm: 'block' },
          gap: 2,
          '& button': {
            margin: '0 8px',
          },
        }}
      >
        <ButtonContained
          color='secondary'
          text='Edit & Save'
          textColor='#fff'
          handleClick={''}
        />
        <ButtonContained
          color='custom'
          text='Delete'
          textColor='#fff'
          handleClick={props.handleOpen}
        />
      </Stack>
    </Stack>
  );
};

export default ReceiptDetailsNav;
