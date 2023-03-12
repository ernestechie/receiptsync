import { HeadWrapper, ReceiptCard, ReceiptsHeader } from '../../../components';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';
import { receipts } from '../../../static/receipts';
import { Modal } from '../../../components';
import { useContext } from 'react';
import ReceiptSearch from '../../../components/Receipt/ReceiptSearch';
import vendorContext from '../../../context/VendorContext';

export default function Receipts() {
  const {
    showProductsModal,
    handleOpenProductsModal,
    handleCloseProductsModal,
  } = useContext(vendorContext);

  return (
    <>
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
