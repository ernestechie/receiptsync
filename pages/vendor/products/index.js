import { ProductsHeader, ProductList } from '../../../components';
import HeadWrapper from '../../../components/HeadWrapper';
import Padding from '../../../layouts/Padding';
import VendorLayout from '../../../layouts/VendorLayout';

export default function Products() {
  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <ProductsHeader />
          <ProductList />
        </Padding>
      </VendorLayout>
    </>
  );
}
