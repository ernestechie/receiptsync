import { useContext } from 'react';
import { ProductList, ProductsHeader } from '../../../components';
import HeadWrapper from '../../../components/HeadWrapper';
import Padding from '../../../layouts/Padding';
import PrivateRoute from '../../../layouts/PrivateRoute';
import VendorLayout from '../../../layouts/VendorLayout';
import Spinner from '../../../components/Common/Spinner';
import authContext from '../../../context/AuthContext';

export default function Products() {
  const { vendorData, isLoading } = useContext(authContext);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <ProductsHeader />
            {isLoading && <Spinner />}
            {!isLoading && vendorData.products.length > 0 && (
              <ProductList products={vendorData.products} />
            )}
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
