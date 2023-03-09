import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const UpdateSecurity = () => {
  return (
    <Box mt={4}>
      <Box mb={8}>
        <Typography mb={4} fontSize={20} fontWeight={600}>
          Change Password
        </Typography>
        <div className='settings-input-group'>
          <label htmlFor='current-password' className='settings-label'>
            Current Password
          </label>
          <input
            type='text'
            id='current-password'
            className='settings-input'
            value={''}
            // disabled={!editState}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='new-password' className='settings-label'>
            New Password
          </label>
          <input
            type='text'
            id='new-password'
            className='settings-input'
            value={''}
            // disabled={!editState}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='confirm-new-password' className='settings-label'>
            Confirm New Password
          </label>
          <input
            type='text'
            id='confirm-new-password'
            className='settings-input'
            value={''}
            // disabled={!editState}
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
          onClick={() => console.log('Clicked')}
        >
          Update Password
        </Button>
      </Box>
      <Box mt={4}>
        <Typography mb={2} fontSize={20} fontWeight={600}>
          Account Deletion
        </Typography>

        <Button
          variant='contained'
          color='custom'
          fullWidth
          disableElevation
          sx={{
            color: '#fff',
            textTransform: 'capitalize',
            p: 1.5,
            borderRadius: 1,
          }}
          onClick={() => console.log('Clicked')}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateSecurity;
