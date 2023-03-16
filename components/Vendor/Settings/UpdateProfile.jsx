import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import authContext from '../../../context/AuthContext';

const UpdateProfile = () => {
  const [editState, setEditState] = useState(false);
  const { vendorData } = useContext(authContext);

  const toggleEditState = () => setEditState((prev) => !prev);

  return (
    <div>
      <Box
        my={4}
        mx='auto'
        height={120}
        width={120}
        sx={{
          '& img': { m: 'auto', display: 'block', borderRadius: 100 },
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
        {/* eslint-disable-next-line */}
        <img
          height={110}
          width={110}
          src={vendorData.logoUrl}
          alt={vendorData.company}
          loading='lazy'
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
          value={vendorData.ownerName}
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
          value={vendorData.businessName}
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
          value={vendorData.companyType}
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
          value={vendorData.email}
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
          value={vendorData.phone}
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
