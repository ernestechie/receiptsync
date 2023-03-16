import { VerticalTabs } from '../../components';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';
import PrivateRoute from '../../layouts/PrivateRoute';

export default function Settings() {
  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <VerticalTabs />
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
