import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ButtonContained } from '../ReceiptSyncButtons';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';

const ReceiptsHeader = () => {
  const handleButtonClick = () => console.log('Button was clicked');

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mb={4}
    >
      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        sx={{ fontSize: 16, cursor: 'pointer' }}
      >
        <Typography fontWeight={600}>{'Filter by Date'}</Typography>
        <MdKeyboardArrowDown />
      </Stack>
      <ButtonContained
        color='secondary'
        text='Issue Receipt'
        textColor='#fff'
        startIcon={<MdAddCircle />}
        handleClick={handleButtonClick}
      />
    </Stack>
  );
};

export default ReceiptsHeader;
