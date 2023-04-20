import { Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductList, ProductsHeader } from '../../components';
import Spinner from '../../components/Common/Spinner';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import PrivateRoute from '../../layouts/PrivateRoute';
import VendorLayout from '../../layouts/VendorLayout';

export default function Products() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortParam, setSortParam] = useState('date-added-asc');

  const {
    entities: {
      products: { products, loading },
    },
  } = useSelector((state) => state);

  const changeSortParam = (param) => {
    setSortParam(param);
    setSortMenuOpen(false);
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
            {loading && <Spinner />}
            {products?.length > 0 && (
              <ProductList products={products} sortBy={sortParam} />
            )}
            {!loading && products?.length === 0 && (
              <Typography
                textAlign='center'
                py={8}
                fontSize={30}
                fontWeight={600}
              >
                Inventory is Empty
              </Typography>
            )}
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
