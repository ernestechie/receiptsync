import { MdHomeFilled, MdInventory, MdPeople, MdReceipt } from 'react-icons/md';
import { RiSettings3Fill, RiPieChart2Fill } from 'react-icons/ri';

export const vendorRoutes = [
  { name: 'Dashboard', url: '/vendor', icon: <MdHomeFilled /> },
  { name: 'Products', url: '/vendor/products', icon: <MdInventory /> },
  { name: 'Sales', url: '/vendor/receipts', icon: <MdReceipt /> },
  { name: 'Insights', url: '/vendor/insights', icon: <RiPieChart2Fill /> },
  { name: 'Customers', url: '/vendor/customers', icon: <MdPeople /> },
  { name: 'Settings', url: '/vendor/settings', icon: <RiSettings3Fill /> },
];
