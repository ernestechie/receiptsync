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

export const vendorData = {
  businessName: 'Ernest Techies',
  vendorName: 'Isaiah Ernest Ovie',
  dateJoined: new Date('2021-10-10'),
  companyType: 'Electronics & Gadgets',
  vendorEmail: 'isaiahernest@gmail.com',
  businessEmail: 'contact@ernesttechies.shop',
  vendorPhone: '09024045567',
  vendorLogo:
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000',
};
