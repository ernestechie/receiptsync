import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';
import authContext from '../../context/AuthContext';
import Drawer from '../Common/Drawer';
import { ButtonContained } from '../ReceiptSyncButtons';

const ProductsHeader = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const { vendorData, setVendorData } = useContext(authContext);

  const { name, description, price, image } = productData;

  const toggleDrawer = (newState) => {
    setDrawerState(newState);
  };

  const inputChangeHandler = (e) => {
    if (!e.target.files) {
      setProductData((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const setProductImage = (e) => {
    // console.log(e.target.files[0]);
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const submitProductData = async () => {
    const productDetailsAreValid =
      name.trim().length > 0 &&
      description.trim().length > 0 &&
      price.trim().length > 0 &&
      image !== null;

    if (productDetailsAreValid) {
      toast.loading('Adding Product...');

      const formData = new FormData();

      formData.append('productName', name);
      formData.append('description', description);
      formData.append('price', parseInt(price));
      formData.append('image', image);
      formData.append('categories[0]', 'clothes');
      formData.append('categories[1]', 'thrift');

      const userToken = JSON.parse(localStorage.getItem('user-token'));
      try {
        const req = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/products`,
          formData,
          {
            headers: {
              common: { 'x-auth-token': userToken['x-auth-token'] },
            },
          }
        );

        if (req.status === 200 || req.status === 201) {
          console.log(req);
          toast.success('Product added!');
          const ctxProducts = vendorData.products;
          const lsData = JSON.parse(localStorage.getItem('vendor-data'));
          const lsProducts = lsData.products;

          ctxProducts.push({
            ...req.data,
            imageUrl: `https://d13zppfo7b7q25.cloudfront.net/${req.data.imageName}`,
          });
          lsProducts.push({
            ...req.data,
            imageUrl: `https://d13zppfo7b7q25.cloudfront.net/${req.data.imageName}`,
          });

          localStorage.setItem(
            'vendor-data',
            JSON.stringify({
              ...lsData,
              products: lsProducts,
            })
          );
          setVendorData((prev) => ({
            ...prev,
            products: ctxProducts,
          }));
        }
      } catch (error) {
        console.log(error);
        toast.error('Error adding product');
      }
      toast.dismiss();
    } else {
      if (image === null) {
        toast.error('Image cannot be empty');
      } else {
        toast.error('Invalid details provided');
      }
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
        {isUploading && <Typography my={2}>Uploading product...</Typography>}
        <Box mb={4}>
          <Box
            mb={2}
            sx={{
              height: 200,
              width: 200,
              mx: 'auto',
              background: 'red',
              borderRadius: 2,
              background: image
                ? `url(${URL.createObjectURL(
                    image
                  )}) no-repeat center center/cover`
                : '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd',
            }}
          >
            {!image && 'No image added'}
          </Box>

          <Button
            color='secondary'
            variant='outlined'
            component='label'
            endIcon={<PhotoCamera />}
            disableElevation
            sx={{
              // color: '#fff',
              borderRadius: 8,
              py: 1.5,
              px: 3,
              textTransform: 'capitalize',
            }}
          >
            {image ? 'Change Image' : 'Upload Image'}
            <input
              hidden
              type='file'
              max='1'
              accept='.jpg, .jpeg, .png'
              id='image'
              onChange={setProductImage}
            />
          </Button>
        </Box>

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
