import { Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductList, ProductsHeader } from '../../components';
import Spinner from '../../components/Common/Spinner';
import HeadWrapper from '../../components/HeadWrapper';
import authContext from '../../context/AuthContext';
import Padding from '../../layouts/Padding';
import PrivateRoute from '../../layouts/PrivateRoute';
import VendorLayout from '../../layouts/VendorLayout';
import { loadProducts } from '../../store/slices/productSlice';

export default function Products() {
  const { vendorData, isLoading } = useContext(authContext);

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortParam, setSortParam] = useState('date-added-asc');

  const dispatch = useDispatch();

  const {
    entities: { products: PRODUCTS },
  } = useSelector((state) => state);

  const changeSortParam = (param) => {
    setSortParam(param);
    setSortMenuOpen(false);
    console.log(param);
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
            {PRODUCTS.loading && <p>Loading...</p>}
            <button
              type='button'
              style={{ padding: '1rem', cursor: 'pointer' }}
              onClick={getProductsHandler}
            >
              Get products
            </button>
            <ProductsHeader
              changeSorting={changeSortParam}
              sortMenuOpen={sortMenuOpen}
              setSortMenuOpen={setSortMenuOpen}
              sortParam={sortParam}
            />
            {isLoading && <Spinner />}
            {!isLoading && PRODUCTS?.products?.length > 0 && (
              <ProductList products={PRODUCTS?.products} sortBy={sortParam} />
            )}
            {PRODUCTS?.products?.length === 0 && (
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
