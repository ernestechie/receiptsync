import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';
import Drawer from '../Common/Drawer';
import { ButtonContained } from '../ReceiptSyncButtons';

const ProductsHeader = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const { name, description, price } = productData;

  const toggleDrawer = (newState) => {
    setDrawerState(newState);
  };

  const inputChangeHandler = (e) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const submitProductData = () => {
    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      price.trim().length === 0
    ) {
      console.log('Please enter valid details');
    } else {
      console.log(productData);
    }
  };

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
        color='primary'
        text='Add Product'
        textColor='#fff'
        startIcon={<MdAddCircle />}
        handleClick={toggleDrawer}
      />
      <Drawer
        drawerState={drawerState}
        toggleDrawer={toggleDrawer}
        heading='Add a Product'
      >
        <div className='settings-input-group'>
          <label htmlFor='name' className='settings-label'>
            Name
          </label>
          <input
            type='text'
            id='name'
            className='settings-input'
            value={name}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='description' className='settings-label'>
            Description
          </label>
          <input
            type='text'
            id='description'
            className='settings-input'
            value={description}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='price' className='settings-label'>
            Price
          </label>
          <input
            type='number'
            id='price'
            className='settings-input'
            value={price}
            onChange={inputChangeHandler}
          />
        </div>

        <Button
          variant='contained'
          color='primary'
          fullWidth
          disableElevation
          sx={{
            color: '#fff',
            textTransform: 'capitalize',
            p: 1.5,
            borderRadius: 1,
          }}
          onClick={submitProductData}
        >
          Add Product
        </Button>
      </Drawer>
    </Stack>
  );
};

export default ProductsHeader;
