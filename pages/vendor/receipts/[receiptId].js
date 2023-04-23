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
import { useEffect, useState } from 'react';
import GoBack from '../../../components/Common/GoBack';
import Spinner from '../../../components/Common/Spinner';
import { Typography, Stack } from '@mui/material';
import { ButtonContained } from '../../../components/ReceiptSyncButtons';
import { theme as CustomTheme } from '../../../pages/_app';
import PrivateRoute from '../../../layouts/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReceipt } from '../../../store/slices/receiptSlice';

export default function ReceiptDetails(props) {
  const {
    entities: {
      receipts: { receipts, loading },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const router = useRouter();
  const id = useRouter().query.receiptId;
  const [current, setCurrent] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const thisReceipt = receipts.find((receipt) => receipt._id === id);

    if (thisReceipt) {
      setCurrent(thisReceipt);
    } else {
      router.replace('/vendor/receipts');
      console.log('No receipt with this ID');
    }
  }, [id, receipts, router]);

  const handleOpen = () => setShowDeleteModal(true);
  const handleClose = () => setShowDeleteModal(false);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper title='Receipt Details' />
        <VendorLayout>
          <Padding>
            {loading && <Spinner />}
            {current && (
              <>
                <GoBack />
                <Modal
                  open={showDeleteModal}
                  handleClose={handleClose}
                  heading='Confirm Delete'
                >
                  <Typography mt={2} mb={4} fontSize={17}>
                    Are you sure you want to delete receipt{' '}
                    <Typography component='span' fontWeight={700}>
                      #{current?.receiptNumber}
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
                      handleClick={() => {
                        dispatch(deleteReceipt(current?._id));
                        handleClose();
                      }}
                    />
                  </Stack>
                </Modal>
                <ReceiptDetailsNav
                  number={current?.receiptNumber}
                  narration={current?.narration}
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
