import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';

export default function Vendor() {
  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <p>Welcome...</p>
        </Padding>
      </VendorLayout>
    </>
  );
}
