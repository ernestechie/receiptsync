import { createContext, useContext, useState } from 'react';
import { products } from '../static/products';

const initialState = {
  sidebarOpen: false,
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
  selectedYear: 2023,
  handleSelectedYear: () => {},
  handleOpenProductsModal: () => {},
  handleCloseProductsModal: () => {},
  addNewProductToReceipt: () => {},
  addedProducts: [],
  changeProductQuantity: () => {},
};

const vendorContext = createContext(initialState);

export const VendorContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const [showProductsModal, setShowProductsModal] = useState(false);

  const [addedProducts, setAddedProducts] = useState([]);
  const [productToAdd, setProductToAdd] = useState('');

  const handleSelectedYear = (newInput) => {
    setSelectedYear(newInput);
  };

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  const handleOpenProductsModal = () => {
    setShowProductsModal(true);
  };
  const handleCloseProductsModal = () => {
    setShowProductsModal(false);
  };

  const addNewProductToReceipt = (id) => {
    const addedProductsDuplicate = [...addedProducts];
    const productInArray = addedProducts.find((product) => product.id === id);

    if (productInArray) {
      const productIndex = addedProducts.findIndex(
        (product) => product.id === id
      );

      const productsDuplicate = [...addedProducts];
      productsDuplicate.splice(productIndex, 1);

      setAddedProducts(productsDuplicate);
    } else {
      const currentProduct = products.find((product) => product.id === id);

      currentProduct.quantity = 1;
      currentProduct.cost = currentProduct.quantity * currentProduct.price;

      addedProductsDuplicate.push(currentProduct);
      setAddedProducts(addedProductsDuplicate);
    }
  };

  const changeProductQuantity = (productId, newQuantity) => {
    const product = addedProducts.find((product) => product.id === productId);
    const productIndex = addedProducts.findIndex(
      (product) => product.id === productId
    );

    product.cost = newQuantity * product.price;

    const productsDuplicate = [...addedProducts];
    productsDuplicate.splice(productIndex, 1, {
      ...product,
      // cost: newQuantity * product.price,
      quantity: newQuantity,
    });

    setAddedProducts(productsDuplicate);

    console.log(addedProducts);
  };

  return (
    <vendorContext.Provider
      value={{
        sidebarOpen,
        handleDrawerClose,
        handleDrawerOpen,
        selectedYear,
        handleSelectedYear,
        handleOpenProductsModal,
        handleCloseProductsModal,
        showProductsModal,
        addNewProductToReceipt,
        addedProducts,
        changeProductQuantity,
      }}
    >
      {children}
    </vendorContext.Provider>
  );
};

export default vendorContext;
