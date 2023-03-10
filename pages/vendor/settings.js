import { VerticalTabs } from '../../components';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';

export default function Settings() {
  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <VerticalTabs />
        </Padding>
      </VendorLayout>
    </>
  );
}
