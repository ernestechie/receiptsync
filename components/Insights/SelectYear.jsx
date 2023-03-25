import React, { useContext, useState, useEffect } from 'react';
import { FilterList, ArrowDropDown } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import vendorContext from '../../context/VendorContext';
import authContext from '../../context/AuthContext';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function SelectYear() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [lifetime, setLifetime] = useState([]);

  const { selectedYear, handleSelectedYear } = useContext(vendorContext);
  const { vendorData } = useContext(authContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value) => {
    handleSelectedYear(value);
    setAnchorEl(null);
  };

  useEffect(() => {
    const dateJoined = new Date(vendorData.dateCreated).getUTCFullYear();
    const today = new Date().getUTCFullYear();

    const years = [];

    for (let index = 0; index <= today - dateJoined; index++) {
      years.push(dateJoined + index);
    }
    setLifetime(years);
  }, [vendorData.dateCreated]);

  return (
    <div>
      <Button
        id='select-chart-year-button'
        aria-controls={open ? 'select-chart-year-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='text'
        disableElevation
        onClick={handleClick}
        startIcon={<FilterList />}
        endIcon={<ArrowDropDown />}
      >
        Showing Results for ({selectedYear})
      </Button>
      <StyledMenu
        id='select-chart-year-menu'
        MenuListProps={{
          'aria-labelledby': 'select-chart-year-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {lifetime.map((year, index) => (
          <span key={year + index}>
            <MenuItem onClick={() => handleChange(year)} disableRipple>
              {year}
            </MenuItem>
            {index !== lifetime.length - 1 && <Divider />}
          </span>
        ))}
      </StyledMenu>
    </div>
  );
}
