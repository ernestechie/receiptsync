import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import vendorContext from '../../context/VendorContext';
import { ButtonContained } from '../ReceiptSyncButtons';

export default function ReceiptSearch(props) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { addedProducts, handleCloseProductsModal, addNewProductToReceipt } =
    useContext(vendorContext);

  const closeProductsPopup = () => {
    handleCloseProductsModal();
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    const foundSearchResults = products.filter(
      (product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(e.target.value.trim().toLowerCase())
    );
    setSearchResults[foundSearchResults];
    console.log(foundSearchResults);
  };

  return (
    <Box sx={{ maxHeight: 600 }} pt={2}>
      <div className='settings-input-group'>
        <input
          type='search'
          id='productSearchInput'
          title='productSearchInput'
          className='settings-input'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <Box mt={2} mb={4}>
        {products
          .filter(
            (product) =>
              product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchValue.trim().toLowerCase())
          )
          .map((product) => (
            <Stack
              key={product.key}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
              onClick={() => addNewProductToReceipt(product.id)}
              my={1}
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: 'pointer',
                background: addedProducts.find((p) => p.id === product.id)
                  ? 'rgba(124, 93, 250, 0.1)'
                  : '#fff',
              }}
            >
              <Box
                component='span'
                sx={{
                  mr: 2,
                  mt: '2px',
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: '3px',
                  background: `url(${product.image}) no-repeat center center/cover`,
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  '& span': {
                    color:
                      theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                  },
                }}
              >
                <Typography variant='subtitle2' fontWeight={600}>
                  {product.name}
                </Typography>
                <span>{product.description}</span>
              </Box>
              <Box
                component={CloseIcon}
                sx={{ opacity: 0.6, width: 18, height: 18 }}
                style={{
                  visibility: addedProducts.find((p) => p.id === product.id)
                    ? 'visible'
                    : 'hidden',
                }}
              />
            </Stack>
          ))}
      </Box>
      <Stack direction='row' justifyContent='flex-end'>
        <ButtonContained
          color='primary'
          text='Done'
          textColor='#fff'
          handleClick={closeProductsPopup}
        />
      </Stack>
    </Box>
  );
}

const products = [
  {
    id: '2k0BtHo5Jogr8iU7SijE18E3nh82',
    name: 'iPhone 11 pro max',
    description: 'iPhone 11 pro max',
    price: 390000,
    image:
      'https://specs-tech.com/wp-content/uploads/2019/09/Apple-iPhone-11-Pro-Max-1.jpg',
  },
  {
    id: '0iSjqwqLP7V1VLkiwKNpPNaboe53',
    name: 'MUI Sketchbook',
    description: 'MUI Hard Cover Sketchbook',
    price: 24000,
    image:
      'https://www.hobbycraft.co.uk/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dwf42bba3d/images/large/634878_1000_1_-seawhite-wiro-portrait-sketchbook-a5.jpg',
  },
  {
    id: '7VRjCUPsXXYeuTXODpI3gmhSroo2',
    name: 'Pure Bliss',
    description: 'Blue Pure Bliss Milk Cream Wafer',
    price: 3500,
    image:
      'https://24hoursmarket.com/wp-content/uploads/2022/07/1657574830020.jpg',
  },
  {
    id: 'UPsXXYeuTXODpI7VRjC3gmhSroo2',
    name: 'Ceramic Dinner Sets',
    description: 'Brown Ceramic Pottery Diner Sets',
    price: 45000,
    image:
      'http://cdn.shopify.com/s/files/1/2116/7717/products/full-dinnerware-set-fulton-heath-ceramics_DWSET5-07_grande.jpg?v=1573093804',
  },
  {
    id: 'TXODpI7VRjC3UPsXXYeugmhSroo2',
    name: 'iPhone 14 pro',
    description: 'Brand new iPhone 14 pro',
    price: 965000,
    image:
      'https://www.purchgadgets.com/wp-content/uploads/2022/11/iphone-14pro.png',
  },
];
