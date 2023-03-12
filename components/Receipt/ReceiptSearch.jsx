import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Typography } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import { styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import vendorContext from '../../context/VendorContext';
import { ButtonContained } from '../ReceiptSyncButtons';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 14,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 14,
  width: '100%',
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
  }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 12,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    fontSize: 15,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
    },
  },
}));

export default function ReceiptSearch(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pendingValue, setPendingValue] = React.useState([]);
  const theme = useTheme();

  const { handleCloseProductsModal, addNewProductToReceipt } =
    useContext(vendorContext);

  const closeProductsPopup = () => {
    handleCloseProductsModal();

    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-product' : undefined;

  return (
    <Box id={id} placement='bottom-start' sx={{ maxHeight: 600 }}>
      <Box mb={4}>
        <Autocomplete
          open
          multiple
          onClose={(event, reason) => {
            if (reason === 'escape') {
              handleCloseProductsModal();
            }
          }}
          value={pendingValue}
          onChange={(event, newValue, reason) => {
            if (
              event.type === 'keydown' &&
              event.key === 'Backspace' &&
              reason === 'removeOption'
            ) {
              return;
            }
            setPendingValue(newValue);
          }}
          disableCloseOnSelect
          PopperComponent={PopperComponent}
          renderTags={() => null}
          noOptionsText='No product found'
          renderOption={(props, option, { selected }) => (
            <li
              {...props}
              style={{
                background: selected
                  ? 'rgba(146, 119, 255, 0.1)'
                  : 'rgba(200, 200, 200, 0.05)',
                margin: 2,
                marginBottom: 6,
                borderBottom: selected ? 'none' : 'initial',
                borderRadius: 4,
              }}
            >
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                width='100%'
                onClick={() => console.log(option.id)}
              >
                <Box
                  component='span'
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: '3px',
                    mr: 2,
                    mt: '2px',
                    background: `url(${option.image}) no-repeat center center/cover`,
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
                    {option.name}
                  </Typography>
                  <span>{option.description}</span>
                </Box>
                <Box
                  component={CloseIcon}
                  sx={{ opacity: 0.6, width: 18, height: 18 }}
                  style={{
                    visibility: selected ? 'visible' : 'hidden',
                  }}
                />
              </Stack>
            </li>
          )}
          options={[...products].sort((a, b) => a.name - b.name)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <StyledInput
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              placeholder='Search products'
            />
          )}
        />
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
