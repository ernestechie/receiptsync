import { HeadWrapper, ReceiptCard, ReceiptsHeader } from '../../../components';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';
import { receipts } from '../../../static/receipts';
import { Modal } from '../../../components';
import { Typography } from '@mui/material';
import { useState } from 'react';

export default function Receipts() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpen = () => setShowDeleteModal(true);
  const handleClose = () => setShowDeleteModal(false);

  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <ReceiptsHeader openModal={handleOpen} />
          <Modal
            open={showDeleteModal}
            handleClose={handleClose}
            heading='Add Products'
          >
            <Typography mt={2} mb={4} fontSize={17}>
              Add a product to receipt list
            </Typography>
          </Modal>
          <>
            {[...receipts.sort((a, b) => b.dateCreated - a.dateCreated)].map(
              (receipt) => (
                <ReceiptCard key={receipt.receiptNumber} receipt={receipt} />
              )
            )}
          </>
        </Padding>
      </VendorLayout>
    </>
  );
}
