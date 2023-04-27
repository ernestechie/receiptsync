import { Box, Grid, Typography, Button } from '@mui/material';
import { CoPresentOutlined, PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import navLogo from '../assets/nav-logo.svg';
import { HeadWrapper, Loader } from '../components';
import { ButtonContained } from '../components/ReceiptSyncButtons';
import Padding from '../layouts/Padding';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewVendor } from '../store/slices/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const {
    entities: {
      vendor: { loading },
    },
  } = useSelector((state) => state);

  const [data, setData] = useState({
    logoUrl: null,
    ownerName: '',
    businessName: '',
    companyType: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    street: '',
    city: '',
  });

  const {
    logoUrl,
    ownerName,
    businessName,
    companyType,
    phone,
    email,
    password,
    confirmPassword,
    street,
    city,
    state,
  } = data;

  const formInputChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const changeVendorLogoImage = (e) => {
    setData((prev) => ({
      ...prev,
      logoUrl: e.target.files[0],
    }));
  };

  const registerUserHandler = async () => {
    const emailIsValid = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const passwordIsValid =
      password.trim().length >= 6 && confirmPassword.trim().length >= 6;
    const passwordsMatch = password === confirmPassword;

    const formIsValid =
      logoUrl !== null &&
      ownerName.trim().length > 0 &&
      businessName.trim().length > 0 &&
      companyType.trim().length > 0 &&
      phone.trim().length > 0 &&
      street.trim().length > 0 &&
      state.trim().length > 0 &&
      city.trim().length > 0 &&
      emailIsValid &&
      passwordIsValid & passwordsMatch;

    if (!formIsValid) {
      if (!emailIsValid) {
        toast.error('Invalid email format');
      }
      if (!passwordIsValid) {
        toast.error('Passwords must be at least 6 digits');
      }
      if (!passwordsMatch) {
        toast.error('Passwords don`t match');
      } else {
        toast.error('One or more inputs are invalid');
      }
    } else {
      // const formData = new FormData();
      // formData.append('logoUrl', logoUrl);
      // formData.append('ownerName', ownerName);
      // formData.append('businessName', businessName);
      // formData.append('companyType', companyType);
      // formData.append('phone', phone);
      // formData.append('email', email);
      // formData.append('password', password);
      // formData.append('address', { state, street, city });

      const userData = {
        email,
        password,
        businessName,
        ownerName,
        address: { street, city, state },
        companyType,
        phone,
        // logo: new FormData().append('logoUrl', logoUrl),
        logo: logoUrl,
      };

      console.log(userData);
      dispatch(registerNewVendor(userData));
    }
  };

  return (
    <>
      <HeadWrapper title='Register | Register a ReceiptSync Vendor Account | Receipt Sync' />
      {loading && <Loader />}
      <Box component='section'>
        <Box mb={4}>
          <Padding>
            <Link href='/'>
              <Image src={navLogo} alt='ReceiptSync logo' width={200} />
            </Link>
          </Padding>
        </Box>

        <Padding>
          <Grid
            container
            mx='auto'
            rowSpacing={{ xs: 2, sm: 2, lg: 2 }}
            columnSpacing={{ sm: 2, md: 2, lg: 2 }}
            columns={12}
            mt={4}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              width='100%'
              sx={{
                display: { xs: 'none', sm: 'none', md: 'flex' },
                '& img': { display: 'block', margin: 'auto', width: '100%' },
              }}
            >
              <Image
                src='https://isaiah-ovie-lendsqr-fe-test.vercel.app/assets/pablo-sign-in-ec537e43.svg'
                width={600}
                height={400}
                alt='ReceiptSync - man looking at a sales chart'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} width='100%'>
              <Box sx={{ mx: 'auto', maxWidth: 400 }}>
                <Typography fontSize={40} fontWeight={700} color='secondary'>
                  Create a Vendor Account
                </Typography>
                <Typography fontSize={20}>
                  Start tracking products & issuing receipts
                </Typography>
              </Box>

              <Box mt={4} mx='auto' maxWidth={400}>
                <form>
                  <Button
                    color='secondary'
                    variant='outlined'
                    component='label'
                    endIcon={
                      <>
                        {logoUrl ? (
                          // eslint-disable-next-line
                          <img
                            src={logoUrl ? URL.createObjectURL(logoUrl) : ''}
                            alt=''
                            style={{ width: '30px', borderRadius: '2px' }}
                          />
                        ) : (
                          <PhotoCamera />
                        )}
                      </>
                    }
                    disableElevation
                    sx={{
                      px: 3,
                      py: 1.5,
                      maxWidth: '400px',
                      borderRadius: 1,
                      textTransform: 'capitalize',
                    }}
                  >
                    <Typography sx={{ width: '100%' }}>
                      {data.logoUrl ? 'Change Logo' : 'Upload Logo'}
                    </Typography>
                    <input
                      hidden
                      type='file'
                      max='1'
                      accept='.jpg, .jpeg, .png'
                      id='logoUrl'
                      onChange={changeVendorLogoImage}
                    />
                  </Button>
                  <Box my={2}>
                    <input
                      type='text'
                      id='ownerName'
                      title='ownerName'
                      placeholder='Vendor Name: '
                      className='settings-input'
                      value={ownerName}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='text'
                      id='businessName'
                      title='businessName'
                      placeholder='Business Name: '
                      className='settings-input'
                      value={businessName}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='text'
                      id='companyType'
                      title='companyType'
                      placeholder='Company Type: (e.g Cosmetics)'
                      className='settings-input'
                      value={companyType}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='email'
                      id='email'
                      title='email'
                      placeholder='Business Email:'
                      className='settings-input'
                      value={email}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='tel'
                      id='phone'
                      title='phone'
                      placeholder='Business Phone:'
                      className='settings-input'
                      value={phone}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Typography fontWeight={600} mt={4} fontSize={18}>
                    Address
                  </Typography>
                  <Box my={2}>
                    <input
                      type='address'
                      id='street'
                      title='street'
                      placeholder='Street:'
                      className='settings-input'
                      value={street}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='address'
                      id='city'
                      title='city'
                      placeholder='City: '
                      className='settings-input'
                      value={city}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='address'
                      id='state'
                      title='state'
                      placeholder='State: '
                      className='settings-input'
                      value={state}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='password'
                      id='password'
                      title='password'
                      placeholder='Password:'
                      className='settings-input'
                      value={password}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='password'
                      id='confirmPassword'
                      title='confirmPassword'
                      placeholder='Confirm Password:'
                      className='settings-input'
                      value={confirmPassword}
                      onChange={formInputChangeHandler}
                    />
                  </Box>
                  <Box mb={4}>
                    <Typography fontSize={18} fontWeight={400}>
                      Already have an account? {'  '}
                      <Typography
                        fontSize={18}
                        fontWeight={700}
                        color='primary'
                        component='span'
                      >
                        <Link href='/login'>Login</Link>
                      </Typography>
                    </Typography>
                  </Box>
                  <ButtonContained
                    text='Sign Up'
                    color='primary'
                    textColor='#fff'
                    style={{ width: '100%', maxWidth: 400 }}
                    handleClick={registerUserHandler}
                    disabled={loading}
                  />
                </form>
              </Box>
            </Grid>
          </Grid>
        </Padding>
      </Box>
    </>
  );
};

export default Register;
