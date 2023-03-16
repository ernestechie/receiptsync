import { RecentSales, StatCards } from '../../components';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';
import PrivateRoute from '../../layouts/PrivateRoute';

export default function Vendor() {
  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
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
