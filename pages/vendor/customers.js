import { CustomersHeader, Modal } from '../../components';
import CustomerItem from '../../components/Customers/CustomerItem';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';
import { Typography, Stack } from '@mui/material';
import { ButtonContained } from '../../components/ReceiptSyncButtons';
import { useState } from 'react';
import { theme as CustomTheme } from '../_app';
import PrivateRoute from '../../layouts/PrivateRoute';

export default function Customers() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState('');

  const handleOpen = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  const handleClose = () => setShowDeleteModal(false);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            {showDeleteModal && (
              <Modal
                open={showDeleteModal}
                handleClose={handleClose}
                heading='Confirm Delete'
              >
                <Typography mt={2} mb={4} fontSize={18}>
                  Proceed to delete this user,{' '}
                  <Typography component='span' fontWeight={600}>
                    {userToDelete}
                  </Typography>
                  ? This action cannot be undone.
                </Typography>

                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='flex-end'
                  gap={2}
                >
                  <ButtonContained
                    color='light'
                    text='Cancel'
                    textColor={CustomTheme.palette.secondary.main}
                    handleClick={handleClose}
                  />
                  <ButtonContained
                    color='custom'
                    text='Delete'
                    textColor='#fff'
                    handleClick={() => console.log('Deleting...')}
                  />
                </Stack>
              </Modal>
            )}
            <CustomersHeader />
            {[1, 2, 3].map((customer) => (
              <CustomerItem
                key={customer}
                handleClose={handleClose}
                handleOpen={handleOpen}
              />
            ))}
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
