import { RecentSales, StatCards } from '../../components';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';

export default function Vendor() {
  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <StatCards />
          <RecentSales />
        </Padding>
      </VendorLayout>
    </>
  );
}
