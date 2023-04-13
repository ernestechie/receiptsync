import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, MenuItem, Stack, Typography, Radio } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdAddCircle, MdKeyboardArrowDown } from 'react-icons/md';
import authContext from '../../context/AuthContext';
import Drawer from '../Common/Drawer';
import { StyledMenu } from '../Insights/SelectYear';
import { ButtonContained } from '../ReceiptSyncButtons';

const ProductsHeader = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerState, setDrawerState] = useState(false);
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

          ctxProducts.push({
            ...req.data,
            imageUrl: `https://d13zppfo7b7q25.cloudfront.net/${req.data.imageName}`,
          });

          setVendorData((prev) => ({
            ...prev,
            products: ctxProducts,
          }));

          setProductData({
            name: '',
            description: '',
            price: '',
            image: null,
          });

          toggleDrawer(false);
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

  const handleSortEl = (e) => {
    setAnchorEl(e.currentTarget);
    props.setSortMenuOpen(true);
  };

  const generateSortParamText = () => {
    // recently-updated date-added-asc date-added-desc name-asc name-desc
    switch (props.sortParam) {
      case 'recently-updated':
        return 'Recently Updated';
      case 'date-added-asc':
        return 'Date Added (Newest)';
      case 'date-added-desc':
        return 'Date Added (Oldest)';
      case 'name-asc':
        return 'Name (A - Z)';
      case 'name-desc':
        return 'Name (Z - A)';
      default:
        return 'Date Added (Newest)';
    }
  };

  return (
    <Stack
      // direction='row'
      // alignItems='center'
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent={{ xs: 'center', sm: 'space-between' }}
      gap={2}
      mb={4}
    >
      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        sx={{ fontSize: 16, cursor: 'pointer' }}
      >
        <Typography
          fontWeight={600}
          sx={{ cusor: 'pointer' }}
          id='sort-products-button'
          aria-controls={props.sortMenuOpen ? 'select-sort-params' : undefined}
          aria-haspopup='true'
          onClick={handleSortEl}
          aria-expanded={open ? 'true' : undefined}
        >
          Sort by:{' '}
          <Typography
            color='primary'
            fontWeight={700}
            fontSize='inherit'
            component='span'
          >
            {generateSortParamText()}
          </Typography>
        </Typography>
        <StyledMenu
          open={props.sortMenuOpen}
          id='select-sort-params'
          MenuListProps={{
            'aria-labelledby': 'sort-products-button',
          }}
          anchorEl={anchorEl}
          onClose={() => props.setSortMenuOpen(false)}
        >
          <MenuItem
            disableRipple
            onClick={() => props.changeSorting('recently-updated')}
          >
            <Radio
              checked={props.sortParam === 'recently-updated'}
              onChange={() => props.changeSorting('recently-updated')}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'recently-updated' }}
            />
            Recently Updated
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={() => props.changeSorting('date-added-asc')}
          >
            <Radio
              checked={props.sortParam === 'date-added-asc'}
              onChange={() => props.changeSorting('date-added-asc')}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'date-added-asc' }}
            />
            Date Added (Recent)
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={() => props.changeSorting('date-added-desc')}
          >
            <Radio
              checked={props.sortParam === 'date-added-desc'}
              onChange={() => props.changeSorting('date-added-desc')}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'date-added-desc' }}
            />
            Date Added (Oldest)
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={() => props.changeSorting('name-asc')}
          >
            <Radio
              checked={props.sortParam === 'name-asc'}
              onChange={() => props.changeSorting('name-asc')}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'name-asc' }}
            />
            Name (A - Z)
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={() => props.changeSorting('name-desc')}
          >
            <Radio
              checked={props.sortParam === 'name-desc'}
              onChange={() => props.changeSorting('name-desc')}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'name-desc' }}
            />
            Name (Z - A)
          </MenuItem>
        </StyledMenu>
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
