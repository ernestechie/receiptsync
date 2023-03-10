import { useTheme } from '@emotion/react';
import { ArrowDropDown } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';
import vendorContext from '../../context/VendorContext';
import Drawer from '../Common/Drawer';
import { ButtonContained } from '../ReceiptSyncButtons';

const ReceiptsHeader = (props) => {
  const [drawerState, setDrawerState] = useState(false);
  const theme = useTheme();

  const toggleDrawer = (newState) => {
    setDrawerState(newState);
  };

  const {
    handleOpenProductsModal,
    addedProducts,
    addNewProductToReceipt,
    changeProductQuantity,
  } = useContext(vendorContext);

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
          <label htmlFor='addresSstreet' className='settings-label'>
            Street Address
          </label>
          <input
            type='address'
            id='addresSstreet'
            title='street'
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
              <label htmlFor='addressCity' className='settings-label'>
                City
              </label>
              <input
                type='address'
                id='addressCity'
                title='city'
                className='settings-input'
                value={''}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} width='100%'>
            <div className='settings-input-group'>
              <label htmlFor='addresSstate' className='settings-label'>
                State
              </label>
              <input
                type='address'
                id='addresSstate'
                title='state'
                className='settings-input'
                value={''}
              />
            </div>
          </Grid>
        </Grid>

        <div className='settings-input-group'>
          <label htmlFor='buyerName' className='settings-label'>
            Buyer`s Name
          </label>
          <input
            type='text'
            id='buyerName'
            title='name'
            className='settings-input'
            value={''}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='buyerPhone' className='settings-label'>
            Buyer`s Phone
          </label>
          <input
            type='tel'
            id='buyerPhone'
            className='settings-input'
            title='phone'
            value={''}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='buyerEmail' className='settings-label'>
            Buyer`s Email
          </label>
          <input
            type='email'
            id='buyerEmail'
            className='settings-input'
            title='email'
            value={''}
          />
        </div>
        <Typography mb={2} color='primary' fontWeight={700} mt={4}>
          RECEIPT DETAILS
        </Typography>
        <div className='settings-input-group'>
          <label htmlFor='narration' className='settings-label'>
            Narration (e.g Groceries & Furnitures)
          </label>
          <input
            type='text'
            id='narration'
            title='narration'
            className='settings-input'
            value={''}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='receiptDate' className='settings-label'>
            Issuing Date
          </label>
          <input
            type='date'
            id='receiptDate'
            title='date'
            className='settings-input'
            value={''}
          />
        </div>

        <Typography mb={2} color='primary' fontWeight={700} mt={4}>
          PRODUCTS LIST
        </Typography>

        <Stack
          alignItems='center'
          justifyContent='space-between'
          direction='row'
          mb={2}
          sx={{
            width: '100&',
            border: '1px solid rgb(200, 200,200,1)',
            p: 2,
            borderRadius: 1,
            transition: '0.4s ease-in',
            cursor: 'pointer',
            userSelect: 'none',

            '&:hover': {
              background: '#f5f5f5',
              transition: '0.4s ease-out',
            },
          }}
          onClick={handleOpenProductsModal}
        >
          <Typography>Select Product</Typography>
          <ArrowDropDown />
        </Stack>
        <Box my={4}>
          {addedProducts.map((product) => (
            <Stack
              key={product.key}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
              my={2}
              sx={{
                p: 1,
                borderRadius: 1,
                background: 'rgba(124, 93, 250, 0.05)',
              }}
            >
              <Box
                component='span'
                sx={{
                  mr: 2,
                  mt: '2px',
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: '3px',
                  background: `url(${product.image}) no-repeat center center/cover`,
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                  },
                  '& input': {
                    outline: 'none',
                    border: 'none',
                    padding: 1,
                    maxWidth: '60px',
                  },
                }}
              >
                <Typography variant='subtitle1' fontWeight={600}>
                  {product.name}
                </Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                  <input
                    type='number'
                    value={product.quantity}
                    onChange={(e) => {
                      if (e.target.value === '' || e.target.value === 0) {
                        // if (e.target.value === 0) {
                        changeProductQuantity(product.id, 1);
                      } else {
                        changeProductQuantity(
                          product.id,
                          parseInt(e.target.value)
                        );
                      }
                    }}
                  />
                  x<span>N{product.price.toLocaleString()}</span>
                </Stack>
              </Box>
              <Typography variant='subtitle1' fontWeight={600}>
                N{(product.price * product.quantity).toLocaleString()}
              </Typography>
              <Box
                onClick={() => addNewProductToReceipt(product.id)}
                component={CloseIcon}
                sx={{ opacity: 0.6, width: 18, height: 18, cursor: 'pointer' }}
                style={{
                  visibility: addedProducts.find((p) => p.id === product.id)
                    ? 'visible'
                    : 'hidden',
                }}
              />
            </Stack>
          ))}
          {addedProducts.length > 0 && (
            <Stack
              direction='row'
              alignItems='center'
              gap={4}
              justifyContent='space-between'
              mt={4}
            >
              <Typography variant='subtitle1'>Total Price:</Typography>
              <Typography fontSize={18} fontWeight={600}>
                N
                {addedProducts
                  .map((product) => product.cost)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </Typography>
            </Stack>
          )}
        </Box>
      </Drawer>
    </Stack>
  );
};

export default ReceiptsHeader;
