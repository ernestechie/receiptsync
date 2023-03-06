import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

const UpdateProfile = () => {
  const [editState, setEditState] = useState(false);

  const [vendorData, setVendorData] = useState({
    name: 'Isaiah Ernest Ovie',
    company: 'Ernest Techies',
    businessType: 'Electronics & Computers',
    businessEmail: 'support@ernesttechies.shop',
    businessPhone: '+2348124045567',
    logo: 'https://www.freeiconspng.com/uploads/face-avatar-png-14.png',
  });

  const toggleEditState = () => setEditState((prev) => !prev);

  return (
    <div>
      <Box
        my={4}
        mx='auto'
        height={120}
        width={120}
        sx={{
          '& img': { m: 'auto', display: 'block' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: 120,
          transition: '.3s ease-out',
          cursor: 'pointer',

          '&:hover': {
            background: 'rgba(0,0,0,0.2)',
            transition: '.3s ease-in',
          },
        }}
      >
        <Image
          height={100}
          width={100}
          src={vendorData.logo}
          alt={vendorData.company}
          priority
        />
      </Box>

      <div className='settings-input-group'>
        <label htmlFor='vendor-name' className='settings-label'>
          Vendor`s Name
        </label>
        <input
          type='text'
          id='vendor-name'
          className='settings-input'
          value={vendorData.name}
          disabled={!editState}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='business-name' className='settings-label'>
          Business Name
        </label>
        <input
          type='text'
          id='business-name'
          className='settings-input'
          value={vendorData.company}
          disabled={!editState}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='company-type' className='settings-label'>
          Company Type
        </label>
        <input
          type='text'
          id='company-type'
          className='settings-input'
          value={vendorData.businessType}
          disabled={!editState}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='business-email' className='settings-label'>
          Business Email
        </label>
        <input
          type='email'
          id='business-email'
          className='settings-input'
          value={vendorData.businessEmail}
          disabled={!editState}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='business-phone' className='settings-label'>
          Business Phone
        </label>
        <input
          type='tel'
          id='business-phone'
          className='settings-input'
          value={vendorData.businessPhone}
          disabled={!editState}
        />
      </div>

      <Button
        variant='contained'
        color={editState ? 'primary' : 'custom'}
        fullWidth
        disableElevation
        sx={{
          color: '#fff',
          textTransform: 'capitalize',
          p: 1.5,
          borderRadius: 1,
        }}
        onClick={toggleEditState}
      >
        {editState ? 'Submit' : 'Update Profile'}
      </Button>
    </div>
  );
};

export default UpdateProfile;
