import { RecentSales, StatCards, Loader } from '../../components';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';
import PrivateRoute from '../../layouts/PrivateRoute';
import { useSelector } from 'react-redux';

export default function Vendor() {
  const {
    entities: {
      vendor: { loading: vendorLoading },
      receipts: { loading: receiptsLoading },
      products: { loading: productsLoading },
    },
  } = useSelector((state) => state);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        {receiptsLoading || productsLoading || (vendorLoading && <Loader />)}
        <VendorLayout>
          <Padding>
            <StatCards />
            <RecentSales />
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
