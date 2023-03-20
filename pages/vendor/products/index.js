import { useEffect, useState } from 'react';
import { ProductList, ProductsHeader } from '../../../components';
import HeadWrapper from '../../../components/HeadWrapper';
import Padding from '../../../layouts/Padding';
import PrivateRoute from '../../../layouts/PrivateRoute';
import VendorLayout from '../../../layouts/VendorLayout';
import axios from 'axios';
import Spinner from '../../../components/Common/Spinner';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    const fetchProductsHandler = async () => {
      setIsFetching(true);
      const lsProducts = JSON.parse(localStorage.getItem('products'));
      if (lsProducts) {
        setProducts(lsProducts);
        setIsFetching(false);
      } else {
        console.log('Products not found');
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ROUTE}/products`,
            {
              headers: {
                common: { 'x-auth-token': userToken['x-auth-token'] },
              },
            }
          );

          if (response.status === 200) {
            console.log(response.data);
            setProducts(response.data);
            localStorage.setItem('products', JSON.stringify(response.data));
          }
        } catch (error) {
          console.log(error);
        }
      }
      setIsFetching(false);
    };
    fetchProductsHandler();
  }, []);

  return (
    <>
      <PrivateRoute>
        <HeadWrapper />
        <VendorLayout>
          <Padding>
            <ProductsHeader />
            {isFetching && <Spinner />}
            {!isFetching && products.length > 0 && (
              <ProductList products={products} />
            )}
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
