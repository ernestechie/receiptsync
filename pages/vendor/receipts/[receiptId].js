import { useRouter } from 'next/router';
import {
  HeadWrapper,
  ReceiptDetailsFooter,
  ReceiptDetailsNav,
  ReceiptDetailsCard,
  Modal,
} from '../../../components';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';
import { receipts } from '../../../static/receipts';
import { useEffect, useState } from 'react';
import GoBack from '../../../components/Common/GoBack';
import { Typography, Stack } from '@mui/material';
import { ButtonContained } from '../../../components/ReceiptSyncButtons';
import { theme as CustomTheme } from '../../../pages/_app';
import PrivateRoute from '../../../layouts/PrivateRoute';

export default function ReceiptDetails(props) {
  const id = useRouter().query.receiptId;
  const [current, setCurrent] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const thisReceipt = receipts.find((receipt) => receipt.id === id);

    if (thisReceipt) {
      console.log(thisReceipt);
      setCurrent(thisReceipt);
    } else console.log('No receipt with this ID');
  }, [id]);

  const handleOpen = () => setShowDeleteModal(true);
  const handleClose = () => setShowDeleteModal(false);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper title='Receipt Details' />
        <VendorLayout>
          <Padding>
            {current && (
              <>
                <GoBack />
                <Modal
                  open={showDeleteModal}
                  handleClose={handleClose}
                  heading='Confirm Delete'
                >
                  <Typography mt={2} mb={4} fontSize={17}>
                    Are you sure you want to delete invoice{' '}
                    <Typography component='span' fontWeight={600}>
                      #{current.receiptNumber}
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
                <ReceiptDetailsNav
                  number={current.receiptNumber}
                  narration={current.narration}
                  handleOpen={handleOpen}
                />
                <ReceiptDetailsCard receipt={current} />
                <ReceiptDetailsFooter handleOpen={handleOpen} />
              </>
            )}
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}

const getServerSideProps = async (context) => {
  console.log('Server running: ' + context);

  return {
    props: {
      data: 'Hello World',
    },
  };
};
