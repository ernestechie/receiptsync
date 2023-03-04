import { CustomersHeader } from '../../../components';
import CustomerItem from '../../../components/Customers/CustomerItem';
import HeadWrapper from '../../../components/HeadWrapper';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';

export default function Customers() {
  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <CustomersHeader />
          {[1, 2, 3].map((customer) => (
            <CustomerItem key={customer} />
          ))}
        </Padding>
      </VendorLayout>
    </>
  );
}
