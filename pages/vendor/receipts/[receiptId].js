import { useRouter } from 'next/router';
import {
  HeadWrapper,
  ReceiptDetailsFooter,
  ReceiptDetailsNav,
  ReceiptDetailsCard,
} from '../../../components';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';
import { receipts } from '../../../static/receipts';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function ReceiptDetails(props) {
  const id = useRouter().query.receiptId;
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const thisReceipt = receipts.find((receipt) => receipt.id === id);

    if (thisReceipt) {
      console.log(thisReceipt);
      setCurrent(thisReceipt);
    } else console.log('No receipt with this ID');
  }, [id]);

  return (
    <>
      <HeadWrapper title='Receipt Details' />
      <VendorLayout>
        <Padding>
          {current && (
            <>
              <ReceiptDetailsNav
                number={current.receiptNumber}
                narration={current.narration}
              />
              <ReceiptDetailsCard receipt={current} />
              <ReceiptDetailsFooter />
            </>
          )}
        </Padding>
      </VendorLayout>
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
