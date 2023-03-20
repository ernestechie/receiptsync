import { createContext, useContext, useState } from 'react';
import authContext from './AuthContext';

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
  setAddedProducts: () => {},
};

const vendorContext = createContext(initialState);

export const VendorContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const [showProductsModal, setShowProductsModal] = useState(false);
  const { vendorData } = useContext(authContext);

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
    console.log(vendorData.products);
    const addedProductsDuplicate = [...addedProducts];
    const productInArray = addedProducts.find((product) => product._id === id);

    if (productInArray) {
      const productIndex = addedProducts.findIndex(
        (product) => product._id === id
      );

      const productsDuplicate = [...addedProducts];
      productsDuplicate.splice(productIndex, 1);

      setAddedProducts(productsDuplicate);
    } else {
      const currentProduct = vendorData.products.find(
        (product) => product._id === id
      );

      addedProductsDuplicate.push({
        ...currentProduct,
        quantity: 1,
        cost: currentProduct?.price,
      });
      setAddedProducts(addedProductsDuplicate);
    }
  };

  const changeProductQuantity = (productId, newQuantity) => {
    const product = addedProducts.find((product) => product._id === productId);
    const productIndex = addedProducts.findIndex(
      (product) => product._id === productId
    );

    const productsDuplicate = [...addedProducts];
    productsDuplicate.splice(productIndex, 1, {
      ...product,
      quantity: newQuantity,
      cost: newQuantity * product.price,
    });

    setAddedProducts(productsDuplicate);
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
        setAddedProducts,
      }}
    >
      {children}
    </vendorContext.Provider>
  );
};

export default vendorContext;
