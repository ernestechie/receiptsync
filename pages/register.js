import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import navLogo from '../assets/nav-logo.svg';
import { HeadWrapper, Loader } from '../components';
import { ButtonContained } from '../components/ReceiptSyncButtons';
import Padding from '../layouts/Padding';

const Register = () => {
  const router = useRouter();

  return (
    <>
      <HeadWrapper title='Register | Register a ReceiptSync Vendor Account | Receipt Sync' />
      {/* {isLoading && <Loader />} */}
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
                  <Box my={2}>
                    <input
                      type='text'
                      id='vendorName'
                      title='vendorName'
                      placeholder='Vendor Name: '
                      className='settings-input'
                      // value={loginEmail}
                      // onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='text'
                      id='businessName'
                      title='businessName'
                      placeholder='Business Name: '
                      className='settings-input'
                      // value={loginEmail}
                      // onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='text'
                      id='companyType'
                      title='companyType'
                      placeholder='Company Type: (e.g Cosmetics)'
                      className='settings-input'
                      // value={loginEmail}
                      // onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='email'
                      id='businessEmail'
                      title='businessEmail'
                      placeholder='Business Email:'
                      className='settings-input'
                      // value={loginEmail}
                      // onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='tel'
                      id='businessPhone'
                      title='businessPhone'
                      placeholder='Business Phone:'
                      className='settings-input'
                      // value={loginEmail}
                      // onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='password'
                      id='password'
                      title='password'
                      placeholder='Password:'
                      className='settings-input'
                      // value={loginPassword}
                      // onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='password'
                      id='confirmPassword'
                      title='confirmPassword'
                      placeholder='Confirm Password:'
                      className='settings-input'
                      // value={loginPassword}
                      // onChange={formInputHandler}
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
                    // handleClick={loginHandler}
                    // disabled={isLoading}
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
