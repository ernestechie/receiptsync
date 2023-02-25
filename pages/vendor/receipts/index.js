import {
  HeadWrapper,
  ReceiptCard,
  ReceiptsHeader,
  // ReceiptsTable,
} from '../../../components';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';
import { receipts } from '../../../static/receipts';

export default function Receipts() {
  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <ReceiptsHeader />
          {/* <ReceiptsTable
            receipts={[
              ...receipts.sort((a, b) => b.dateCreated - a.dateCreated),
            ]}
          /> */}
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
