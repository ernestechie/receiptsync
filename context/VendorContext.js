import { createContext, useContext, useState } from 'react';

const initialState = {
  sidebarOpen: false,
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
  selectedYear: 2023,
  handleSelectedYear: () => {},
  handleOpenProductsModal: () => {},
  handleCloseProductsModal: () => {},
  addNewProductToReceipt: () => {},
};

const vendorContext = createContext(initialState);

export const VendorContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const [showProductsModal, setShowProductsModal] = useState(false);

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
    console.log(id);
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
      }}
    >
      {children}
    </vendorContext.Provider>
  );
};

export default vendorContext;
