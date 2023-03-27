import { useContext, useState } from 'react';
import { ProductList, ProductsHeader } from '../../components';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import PrivateRoute from '../../layouts/PrivateRoute';
import VendorLayout from '../../layouts/VendorLayout';
import Spinner from '../../components/Common/Spinner';
import authContext from '../../context/AuthContext';
import { Typography } from '@mui/material';

export default function Products() {
  const { vendorData, isLoading } = useContext(authContext);

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortParam, setSortParam] = useState('date-added-asc');

  const changeSortParam = (param) => {
    setSortParam(param);
    setSortMenuOpen(false);
    console.log(param);
  };

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <ProductsHeader
              changeSorting={changeSortParam}
              sortMenuOpen={sortMenuOpen}
              setSortMenuOpen={setSortMenuOpen}
              sortParam={sortParam}
            />
            {isLoading && <Spinner />}
            {!isLoading && vendorData.products?.length > 0 && (
              <ProductList products={vendorData.products} sortBy={sortParam} />
            )}
            {vendorData.products?.length === 0 && (
              <Typography textAlign='center' py={8} fontSize={30}>
                No products yet
              </Typography>
            )}
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
