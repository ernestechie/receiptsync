import { Box, Button, Typography } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../Common/Spinner';
import { updateVendorProfile } from '../../../store/slices/authSlice';

const UpdateProfile = () => {
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();
  const {
    entities: {
      vendor: { data: vendorData, loading },
    },
  } = useSelector((state) => state);

  const [data, setData] = useState({ ...vendorData });
  const [changedProps, setChangedProps] = useState(null);

  const toggleEditState = () => setEditState((prev) => !prev);

  const inputChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setChangedProps((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const changeProductImage = (e) => {
    setData((prev) => ({
      ...prev,
      logoUrl: e.target.files[0],
    }));
    setChangedProps((prev) => ({ ...prev, logoUrl: e.target.files[0] }));
  };

  const resetEditStateHandler = () => {
    setData({ ...vendorData });
    setChangedProps(null);
    setEditState(false);
  };

  const profileUpdateHandler = () => {
    setEditState(false);
    if (changedProps) {
      const allState = { ...data, ...changedProps };
      const formData = new FormData();

      for (const key in allState) {
        formData.append([key], data[key]);
      }

      dispatch(updateVendorProfile({ data: allState, vendorId: data._id }));
      // console.log(allState);
    } else {
      console.log('Nothing was changed');
    }
  };

  return (
    <>
      {loading && <Spinner />}
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
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 120,
          transition: '.3s ease-out',
          cursor: 'pointer',

          '&:hover': {
            background: 'rgba(0,0,0,0.5)',
            transition: '.3s ease-in',
          },
        }}
      >
        {/* eslint-disable-next-line */}
        <img
          height={110}
          width={110}
          src={
            changedProps?.logoUrl
              ? URL.createObjectURL(changedProps?.logoUrl)
              : data?.logoUrl
          }
          alt={data?.company}
          loading='lazy'
        />
      </Box>

      {editState && (
        <Button
          color='secondary'
          variant='outlined'
          component='label'
          endIcon={<PhotoCamera />}
          disableElevation
          sx={{
            mb: 4,
            px: 3,
            py: 1.5,
            maxWidth: '352px',
            borderRadius: 8,
            textTransform: 'capitalize',
          }}
        >
          <Typography sx={{ width: '100%' }}>
            {data.logoUrl ? 'Change Image' : 'Upload Image'}
          </Typography>
          <input
            hidden
            type='file'
            max='1'
            accept='.jpg, .jpeg, .png'
            id='image'
            onChange={changeProductImage}
          />
        </Button>
      )}

      <div className='settings-input-group'>
        <label htmlFor='ownerName' className='settings-label'>
          Vendor`s Name
        </label>
        <input
          type='text'
          id='ownerName'
          className='settings-input'
          value={data?.ownerName}
          disabled={!editState}
          onChange={inputChangeHandler}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='businessName' className='settings-label'>
          Business Name
        </label>
        <input
          type='text'
          id='businessName'
          className='settings-input'
          value={data?.businessName}
          disabled={!editState}
          onChange={inputChangeHandler}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='companyType' className='settings-label'>
          Company Type
        </label>
        <input
          type='text'
          id='companyType'
          className='settings-input'
          value={data?.companyType}
          disabled={!editState}
          onChange={inputChangeHandler}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='phone' className='settings-label'>
          Business Phone
        </label>
        <input
          type='tel'
          id='phone'
          className='settings-input'
          value={data?.phone}
          disabled={!editState}
          onChange={inputChangeHandler}
        />
      </div>
      <div className='settings-input-group'>
        <label htmlFor='email' className='settings-label'>
          Business Email (Contact Support to Change)
        </label>
        <input
          type='email'
          id='email'
          className='settings-input'
          value={data?.email}
          disabled
          // disabled={!editState}
          // onChange={inputChangeHandler}
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
        onClick={() => {
          if (editState) profileUpdateHandler();
          else toggleEditState();
        }}
      >
        {editState ? 'Submit' : 'Update Profile'}
      </Button>

      {editState && (
        <Button
          variant='outlined'
          color='custom'
          fullWidth
          disableElevation
          sx={{
            textTransform: 'capitalize',
            p: 1.5,
            borderRadius: 1,
            mt: 2,
          }}
          onClick={resetEditStateHandler}
        >
          Cancel
        </Button>
      )}
    </>
  );
};

export default UpdateProfile;
