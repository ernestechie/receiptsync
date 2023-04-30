import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { changeVendorPassword } from '../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

const UpdateSecurity = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const { currentPassword, newPassword, confirmNewPassword } = formData;

  const inputChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const updateVendorPasswordHandler = async () => {
    const passwordIsValid =
      newPassword.length >= 4 && confirmNewPassword.length >= 4;
    const passwordsMatch = newPassword === confirmNewPassword;

    if (passwordIsValid) {
      if (passwordsMatch) {
        dispatch(changeVendorPassword({ currentPassword, newPassword }));
      } else {
        toast.error('Passwords don`t match');
      }
    } else {
      toast.error('Password must be 4 digits or more');
    }
  };

  return (
    <Box mt={4}>
      <Box mb={8}>
        <Typography mb={4} fontSize={20} fontWeight={600}>
          Change Password
        </Typography>
        <div className='settings-input-group'>
          <label htmlFor='currentPassword' className='settings-label'>
            Current Password
          </label>
          <input
            type='password'
            id='currentPassword'
            className='settings-input'
            value={currentPassword}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='newPassword' className='settings-label'>
            New Password
          </label>
          <input
            type='password'
            id='newPassword'
            className='settings-input'
            value={newPassword}
            onChange={inputChangeHandler}
          />
        </div>
        <div className='settings-input-group'>
          <label htmlFor='confirmNewPassword' className='settings-label'>
            Confirm New Password
          </label>
          <input
            type='password'
            id='confirmNewPassword'
            className='settings-input'
            value={confirmNewPassword}
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
          onClick={updateVendorPasswordHandler}
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
