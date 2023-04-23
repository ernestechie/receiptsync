import { HeadWrapper, ReceiptCard, ReceiptsHeader } from '../../../components';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';
import { Modal } from '../../../components';
import Spinner from '../../../components/Common/Spinner';
import { useContext } from 'react';
import ReceiptSearch from '../../../components/Receipt/ReceiptSearch';
import vendorContext from '../../../context/VendorContext';
import PrivateRoute from '../../../layouts/PrivateRoute';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Receipts() {
  const {
    showProductsModal,
    handleOpenProductsModal,
    handleCloseProductsModal,
  } = useContext(vendorContext);

  const {
    entities: {
      receipts: { receipts, loading },
    },
  } = useSelector((state) => state);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <ReceiptsHeader openModal={handleOpenProductsModal} />
            <Modal
              open={showProductsModal}
              handleClose={handleCloseProductsModal}
              heading='Add Products'
            >
              <ReceiptSearch />
            </Modal>
            <>
              {loading && <Spinner />}
              {receipts?.length > 0 && (
                <>
                  {[...receipts]
                    .sort(
                      (a, b) =>
                        new Date(b.dateIssued).getTime() -
                        new Date(a.dateIssued).getTime()
                    )
                    .map((receipt) => (
                      <ReceiptCard key={receipt._id} receipt={receipt} />
                    ))}
                </>
              )}
              {!loading && receipts?.length === 0 && (
                <Typography
                  textAlign='center'
                  py={8}
                  fontSize={30}
                  fontWeight={600}
                >
                  No sales recorded
                </Typography>
              )}
            </>
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
