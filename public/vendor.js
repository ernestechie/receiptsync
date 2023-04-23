import { MdHomeFilled, MdInventory, MdPeople, MdReceipt } from 'react-icons/md';
import { RiSettings3Fill, RiPieChart2Fill } from 'react-icons/ri';

export const vendorRoutes = [
  { name: 'Dashboard', url: '/vendor', icon: <MdHomeFilled /> }, //Done
  { name: 'Products', url: '/vendor/products', icon: <MdInventory /> }, // Done
  { name: 'Sales', url: '/vendor/receipts', icon: <MdReceipt /> }, // Done
  { name: 'Insights', url: '/vendor/insights', icon: <RiPieChart2Fill /> }, // Done
  // { name: 'Customers', url: '/vendor/customers', icon: <MdPeople /> },
  { name: 'Settings', url: '/vendor/settings', icon: <RiSettings3Fill /> },
];
