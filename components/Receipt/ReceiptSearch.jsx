import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import vendorContext from '../../context/VendorContext';
import { ButtonContained } from '../ReceiptSyncButtons';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductToReceipt } from '../../store/slices/receiptSlice';

export default function ReceiptSearch(props) {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [loadMore, setLoadMore] = useState(5);

  const dispatch = useDispatch();

  const {
    entities: {
      products: { products, loading },
      receipts: { addedProducts },
    },
  } = useSelector((state) => state);

  const { handleCloseProductsModal } = useContext(vendorContext);

  const closeProductsPopup = () => {
    handleCloseProductsModal();
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Box sx={{ maxHeight: 500, overflow: 'scroll' }} py={2}>
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
              product.productName
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(searchValue.trim().toLowerCase())
          )
          .splice(0, loadMore)
          .map((product) => (
            <Stack
              key={product.key}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              width='100%'
              onClick={() => dispatch(addNewProductToReceipt(product._id))}
              my={1}
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: 'pointer',
                background: addedProducts.find((p) => p._id === product._id)
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
                  background: `url(${product.imageUrl}) no-repeat center center/cover`,
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
                <Typography
                  variant='subtitle1'
                  fontWeight={700}
                  textTransform='capitalize'
                >
                  {product.productName}
                </Typography>
                <Typography textTransform='capitalize' variant='subtitle2'>
                  N{product.price.toLocaleString()}
                </Typography>
              </Box>
              <Box
                component={CloseIcon}
                sx={{ opacity: 0.6, width: 18, height: 18 }}
                style={{
                  visibility: addedProducts.find((p) => p._id === product._id)
                    ? 'visible'
                    : 'hidden',
                }}
              />
            </Stack>
          ))}
      </Box>

      {searchValue.trim() === '' && products.length > loadMore && (
        <Button
          variant='outlined'
          color='secondary'
          mb={2}
          sx={{ mx: 'auto', textTransform: 'capitalize' }}
          startIcon={<RefreshIcon />}
          onClick={() => setLoadMore((prev) => prev + 5)}
        >
          Load More
        </Button>
      )}

      <ButtonContained
        color='primary'
        text='Done'
        textColor='#fff'
        handleClick={closeProductsPopup}
        style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}
      />
    </Box>
  );
}
