import React, { useState } from 'react';
import { Stack, Typography, Box, Grid } from '@mui/material';
import { ButtonContained } from '../ReceiptSyncButtons';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';
import Drawer from '../Common/Drawer';

const ReceiptsHeader = () => {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (newState) => {
    setDrawerState(newState);
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mb={4}
      mx='auto'
      maxWidth={768}
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
        handleClick={toggleDrawer}
      />

      <Drawer
        drawerState={drawerState}
        toggleDrawer={toggleDrawer}
        heading='New Receipt'
      >
        <Typography mb={2} color='primary' fontWeight={700}>
          BUYER DETAILS
        </Typography>

        <div className='settings-input-group'>
          <label htmlFor='address-street' className='settings-label'>
            Street Address
          </label>
          <input
            type='address'
            id='address-street'
            className='settings-input'
            value={''}
          />
        </div>
        <Grid
          container
          mx='auto'
          rowSpacing={{ xs: 2, sm: 2 }}
          columnSpacing={{ sm: 2, md: 2 }}
          columns={12}
          mb={2}
        >
          <Grid item xs={12} sm={6} width='100%'>
            <div className='settings-input-group'>
              <label htmlFor='address-city' className='settings-label'>
                City
              </label>
              <input
                type='address'
                id='address-city'
                className='settings-input'
                value={''}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} width='100%'>
            <div className='settings-input-group'>
              <label htmlFor='address-state' className='settings-label'>
                State
              </label>
              <input
                type='address'
                id='address-state'
                className='settings-input'
                value={''}
              />
            </div>
          </Grid>
        </Grid>

        <div className='settings-input-group'>
          <label htmlFor='buyer-name' className='settings-label'>
            Buyer`s Name
          </label>
          <input
            type='text'
            id='buyer-name'
            className='settings-input'
            value={''}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='buyer-phone' className='settings-label'>
            Buyer`s Phone
          </label>
          <input
            type='tel'
            id='buyer-phone'
            className='settings-input'
            value={''}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='buyer-email' className='settings-label'>
            Buyer`s Email
          </label>
          <input
            type='email'
            id='buyer-email'
            className='settings-input'
            value={''}
          />
        </div>
        <Box my={4}></Box>
        <Typography mb={2} color='primary' fontWeight={700}>
          RECEIPT DETAILS
        </Typography>
        <div className='settings-input-group'>
          <label htmlFor='narration' className='settings-label'>
            Narration (e.g Groceries & Furnitures)
          </label>
          <input
            type='text'
            id='narration'
            className='settings-input'
            value={''}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='receipt-date' className='settings-label'>
            Issuing Date
          </label>
          <input
            type='date'
            id='receipt-date'
            className='settings-input'
            value={''}
          />
        </div>
      </Drawer>
    </Stack>
  );
};

export default ReceiptsHeader;
