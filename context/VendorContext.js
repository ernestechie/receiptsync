import { createContext, useContext, useState } from 'react';

const initialState = {
  sidebarOpen: false,
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
  selectedYear: 2023,
  handleSelectedYear: () => {},
};

const vendorContext = createContext(initialState);

export const VendorContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <vendorContext.Provider
      value={{
        sidebarOpen,
        handleDrawerClose,
        handleDrawerOpen,
        selectedYear,
        handleSelectedYear,
      }}
    >
      {children}
    </vendorContext.Provider>
  );
};

export default vendorContext;
