import React from 'react';
import { ButtonContained } from '../../ReceiptSyncButtons';
import { Stack } from '@mui/material';

const ReceiptDetailsFooter = (props) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='flex-end'
      sx={{
        display: { xs: 'flex', sm: 'none' },
        position: 'fixed',
        width: '100%',
        height: '5rem',
        left: 0,
        bottom: 0,
        p: 2,
        boxShadow: '0px 10px 10px -10px rgba(72, 84, 159, 0.2)',
        bgcolor: '#fff',
        gap: 2,
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
  );
};

export default ReceiptDetailsFooter;
