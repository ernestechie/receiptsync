import { createContext, useState } from 'react';

const initialState = {
  sidebarOpen: false,
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
  selectedYear: 2023,
  handleSelectedYear: () => {},
  handleOpenProductsModal: () => {},
  handleCloseProductsModal: () => {},
};

const vendorContext = createContext(initialState);

export const VendorContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());

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

  return (
    <vendorContext.Provider
      value={{
        sidebarOpen,
        handleDrawerClose,
        handleDrawerOpen,
        handleSelectedYear,
        handleOpenProductsModal,
        handleCloseProductsModal,
        showProductsModal,
        selectedYear,
      }}
    >
      {children}
    </vendorContext.Provider>
  );
};

export default vendorContext;
