import { createContext, useContext, useState } from 'react';

const initialState = {
  sidebarOpen: false,
  handleDrawerOpen: () => {},
  handleDrawerClose: () => {},
};

const vendorContext = createContext(initialState);

export const VendorContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <vendorContext.Provider
      value={{ sidebarOpen, handleDrawerClose, handleDrawerOpen }}
    >
      {children}
    </vendorContext.Provider>
  );
};

export default vendorContext;
