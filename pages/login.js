import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import navLogo from '../assets/nav-logo.svg';
import { HeadWrapper, Loader } from '../components';
import { ButtonContained } from '../components/ReceiptSyncButtons';
import Padding from '../layouts/Padding';
import { vendorFetchBegan } from '../store/api';
import { URL } from '../store/config/URL';
import { logUserIn } from '../store/slices/authSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    entities: {
      vendor: { loggedIn, loading, data },
    },
  } = useSelector((state) => state);

  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const { loginEmail, loginPassword } = formData;

  useEffect(() => {
    if (loggedIn) router.replace('/vendor');
  }, [loggedIn, data, router]);

  const formInputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const loginHandler = async () => {
    const emailIsValid = loginEmail.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!emailIsValid) {
      toast.error('Email is invalid');
    }
    if (loginPassword.length < 1) {
      toast.error('Password must not be empty');
    } else {
      try {
        // console.log(loading);
        dispatch(
          vendorFetchBegan({
            url: `${URL}/auth/login`,
            method: 'post',
            data: {
              email: loginEmail,
              password: loginPassword,
            },
            onSuccess: logUserIn,
          })
        );
        // router.replace('/vendor');
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Something went wrong');
        }
      }
    }
  };

  return (
    <>
      <HeadWrapper title='Login | Login to your ReceiptSync Vendor Account | Receipt Sync' />
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
                alignItems: 'center',
                justifyContent: 'center',
                '& img': { display: 'block', margin: 'auto', width: '100%' },
              }}
            >
              <Image
                src='https://isaiah-ovie-lendsqr-fe-test.vercel.app/assets/pablo-sign-in-ec537e43.svg'
                width={600}
                height={400}
                // src={loginPageSvg}
                alt='ReceiptSync - man looking at a sales chart'
                // width={360}
                // height={360}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} width='100%'>
              <Box sx={{ mx: 'auto', maxWidth: 400 }}>
                <Typography fontSize={44} fontWeight={700} color='secondary'>
                  Welcome!
                </Typography>
                <Typography fontSize={20}>Enter details to login</Typography>
              </Box>

              <Box mt={4} mx='auto' maxWidth={400}>
                <form>
                  <Box my={2}>
                    <input
                      type='email'
                      id='loginEmail'
                      title='email'
                      placeholder='Email'
                      className='settings-input'
                      value={loginEmail}
                      onChange={formInputHandler}
                    />
                  </Box>
                  <Box my={2}>
                    <input
                      type='password'
                      id='loginPassword'
                      title='password'
                      placeholder='Password'
                      className='settings-input'
                      value={loginPassword}
                      onChange={formInputHandler}
                    />
                  </Box>
                  <Typography
                    fontSize={18}
                    fontWeight={600}
                    textAlign='right'
                    color='secondary'
                    mb={2}
                  >
                    <Link href='/forgot-password'>Forgot Password?</Link>
                  </Typography>
                  <Box mb={4}>
                    <Typography fontSize={18} fontWeight={400}>
                      New to ReceiptSync? {'  '}
                      <Typography
                        fontSize={18}
                        fontWeight={700}
                        color='primary'
                        component='span'
                      >
                        <Link href='/register'>Register</Link>
                      </Typography>
                    </Typography>
                  </Box>
                  <ButtonContained
                    text='Login'
                    color='primary'
                    textColor='#fff'
                    style={{ width: '100%', maxWidth: 400 }}
                    handleClick={loginHandler}
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

export default Login;
