import { useTheme } from '@emotion/react';
import { ArrowDropDown, Delete } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';
import vendorContext from '../../context/VendorContext';
import Drawer from '../Common/Drawer';
import { ButtonContained } from '../ReceiptSyncButtons';

const ReceiptsHeader = (props) => {
  const [maxDate, setMaxDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [drawerState, setDrawerState] = useState(false);
  const [formData, setFormData] = useState({
    narration: '',
    receiptDate: '',
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    addresSstreet: '',
    addressCity: '',
    addresSstate: '',
  });

  const {
    narration,
    receiptDate,
    buyerName,
    buyerPhone,
    buyerEmail,
    addresSstreet,
    addressCity,
    addresSstate,
  } = formData;

  const theme = useTheme();

  const toggleDrawer = (newState) => {
    setDrawerState(newState);
  };

  const {
    handleOpenProductsModal,
    addedProducts,
    addNewProductToReceipt,
    changeProductQuantity,
    setAddedProducts,
  } = useContext(vendorContext);

  const formInputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const submitReceiptHandler = () => {
    // Validate form data for all fields
    const emailIsValid = buyerEmail.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const receiptIsValid =
      addedProducts.length > 0 &&
      addresSstate.trim().length > 0 &&
      addresSstreet.trim().length > 0 &&
      addressCity.trim().length > 0 &&
      narration.trim().length > 0 &&
      emailIsValid &&
      buyerName.trim().length > 0 &&
      receiptDate.trim().length > 0;

    if (receiptIsValid) {
      const newReceipt = {
        id: new Date().getTime().toString(),
        receiptNumber: `${buyerPhone.slice(3, 5).toUpperCase()}${new Date()
          .getTime()
          .toString()
          .slice(7, 12)}${buyerName.slice(0, 2).toUpperCase()}`,
        dateCreated: new Date(receiptDate),
        dateUpdated: new Date(),
        logoUrl: '',
        seller: {
          name: 'Isaiah Ernest',
          phone: '09012345666',
          email: 'isaiahernest081@gmail.com',
          address: 'Benny street, Yenagoa, Nigeria.',
          branchNO: 3,
        },
        customer: {
          name: buyerName,
          phone: buyerPhone,
          sendTo: buyerEmail,
          address: {
            street: addresSstreet,
            city: addressCity,
            state: addresSstate,
          },
        },
        items: addedProducts,
        narration,
      };
      console.log(newReceipt);
    } else {
      toast.error('One or more inputs are invalid');
    }
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mb={4}
      mx='auto'
      maxWidth={1024}
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
            value={addresSstreet}
            onChange={formInputHandler}
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
                value={addressCity}
                onChange={formInputHandler}
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
                value={addresSstate}
                onChange={formInputHandler}
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
            value={buyerName}
            onChange={formInputHandler}
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
            value={buyerPhone}
            onChange={formInputHandler}
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
            value={buyerEmail}
            onChange={formInputHandler}
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
            value={narration}
            onChange={formInputHandler}
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
            max={maxDate}
            value={receiptDate}
            onChange={formInputHandler}
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
              key={product._id}
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
                  background: `url(${product.imageUrl}) no-repeat center center/cover`,
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
                <Typography
                  variant='subtitle1'
                  fontWeight={600}
                  textTransform='capitalize'
                >
                  {product.productName}
                </Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                  <input
                    type='number'
                    value={product.quantity}
                    onChange={(e) => {
                      if (parseInt(e.target.value) <= 0) {
                        changeProductQuantity(product._id, 1);
                      } else {
                        changeProductQuantity(
                          product._id,
                          parseInt(e.target.value)
                        );
                      }
                    }}
                  />
                  x
                  <Typography component='span' variant='subtitle2'>
                    N{product.price?.toLocaleString()}
                  </Typography>
                </Stack>
              </Box>
              {isNaN(product?.price * product.quantity) ? (
                '. . .'
              ) : (
                <Typography variant='subtitle1' fontWeight={600}>
                  N{(product?.price * product.quantity).toLocaleString()}
                </Typography>
              )}
              <Box
                onClick={() => addNewProductToReceipt(product._id)}
                component={Delete}
                sx={{
                  opacity: 0.6,
                  width: 18,
                  height: 18,
                  cursor: 'pointer',
                  ml: 1,
                }}
                style={{
                  visibility: addedProducts.find((p) => p._id === product._id)
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
              {isNaN(
                addedProducts
                  .map((product) => product.cost)
                  .reduce((a, b) => a + b, 0)
              ) ? (
                '. . .'
              ) : (
                <Typography
                  fontSize={18}
                  fontWeight={600}
                  sx={{ transition: '0.5s ease-in' }}
                >
                  N
                  {addedProducts
                    .map((product) => product.cost)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </Typography>
              )}
            </Stack>
          )}

          <Stack
            mt={6}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={2}
          >
            {addedProducts.length > 0 && (
              <ButtonContained
                textColor='#fff'
                color='primary'
                text='Submit'
                style={{ width: '80%' }}
                handleClick={submitReceiptHandler}
              />
            )}
            <ButtonContained
              textColor='#fff'
              color='custom'
              text='Cancel'
              handleClick={() => {
                toggleDrawer();
                setAddedProducts([]);
              }}
            />
          </Stack>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default ReceiptsHeader;
