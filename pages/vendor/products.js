import { Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList, ProductsHeader } from '../../components';
import Spinner from '../../components/Common/Spinner';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import PrivateRoute from '../../layouts/PrivateRoute';
import VendorLayout from '../../layouts/VendorLayout';
import { loadProducts } from '../../store/slices/productSlice';

export default function Products() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortParam, setSortParam] = useState('date-added-asc');

  const dispatch = useDispatch();

  const {
    entities: {
      products: { products, loading },
    },
  } = useSelector((state) => state);

  const changeSortParam = (param) => {
    setSortParam(param);
    setSortMenuOpen(false);
  };

  const getProductsHandler = () => {
    dispatch(loadProducts());
  };

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            {/* {loading && <p>Fetching...</p>}
            <button
              type='button'
              style={{ padding: '1rem', cursor: 'pointer' }}
              onClick={getProductsHandler}
            >
              Get products
            </button> */}
            <ProductsHeader
              changeSorting={changeSortParam}
              sortMenuOpen={sortMenuOpen}
              setSortMenuOpen={setSortMenuOpen}
              sortParam={sortParam}
            />
            {loading && <Spinner />}
            {!loading && products?.length > 0 && (
              <ProductList products={products} sortBy={sortParam} />
            )}
            {products?.length === 0 && (
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
