import { ProductsHeader, ProductList } from '../../../components';
import HeadWrapper from '../../../components/HeadWrapper';
import Padding from '../../../layouts/Padding';
import PrivateRoute from '../../../layouts/PrivateRoute';
import VendorLayout from '../../../layouts/VendorLayout';

export default function Products() {
  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <ProductsHeader />
            <ProductList />
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
