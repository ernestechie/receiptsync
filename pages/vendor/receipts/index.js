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
import { useState } from 'react';

export default function Receipts() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortParam, setSortParam] = useState('date-added-asc');

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

  const changeSortParam = (param) => {
    setSortParam(param);
    setSortMenuOpen(false);
  };

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <ReceiptsHeader
              openModal={handleOpenProductsModal}
              changeSorting={changeSortParam}
              sortMenuOpen={sortMenuOpen}
              setSortMenuOpen={setSortMenuOpen}
              sortParam={sortParam}
            />
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
                    .sort((a, b) => {
                      switch (sortParam) {
                        case 'recently-updated':
                          return (
                            new Date(b.updatedAt).getTime() -
                            new Date(a.updatedAt).getTime()
                          );
                        case 'date-added-asc':
                          return (
                            new Date(b.dateIssued).getTime() -
                            new Date(a.dateIssued).getTime()
                          );
                        case 'date-added-desc':
                          return (
                            new Date(a.dateIssued).getTime() -
                            new Date(b.dateIssued).getTime()
                          );
                        default:
                          new Date(b.dateIssued).getTime() -
                            new Date(a.dateIssued).getTime();
                      }
                    })
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
