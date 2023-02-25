import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, styled, Divider, Stack } from '@mui/material';
import { MdLogout } from 'react-icons/md';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery } from '@mui/material';
import { vendorRoutes } from '../static/vendor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { theme as CustomTheme } from '../pages/_app';
import vendorContext from '../context/VendorContext';
import { Menu } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  boxShadow: 'none',
  background: 'transparent',
  color: theme.palette.grey[900],
}));

const Drawer = styled(MuiDrawer, {
  // shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function VendorLayout({ children }) {
  const theme = useTheme();
  const pathname = useRouter().pathname;
  const desktop = useMediaQuery(theme.breakpoints.up('lg'));
  const tablet = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.up('xs'));

  const { sidebarOpen, handleDrawerClose, handleDrawerOpen } =
    useContext(vendorContext);

  const variants = () => {
    if (desktop) return 'permanent';
    if (tablet) return 'permanent';
    if (mobile) return 'temporary';
  };

  const getPageName = () => {
    if (pathname === '/vendor') {
      return 'Dashboard';
    }
    if (pathname.includes('/vendor/products')) {
      return 'Products';
    }
    if (pathname.includes('/vendor/customers')) {
      return 'Customers';
    }
    if (pathname.includes('/vendor/receipts')) {
      return 'Receipts';
    }
    if (pathname.includes('/vendor/insights')) {
      return 'Insights';
    }
    if (pathname.includes('/vendor/settings')) {
      return 'Settings';
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant={variants()}
        open={sidebarOpen}
        sx={{
          '& .MuiDrawer-paper': {
            background: CustomTheme.palette.custom.light,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ p: 1 }}>
          {vendorRoutes.map((route, index) => (
            <Link key={`${route.name}-${index}`} href={route.url}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 44,
                    justifyContent: sidebarOpen ? 'initial' : 'center',
                    px: 2,
                    py: 1,
                    my: 1,
                    borderRadius: 2,
                    alignItems: 'center',
                    background:
                      pathname === route.url
                        ? CustomTheme.palette.primary.main
                        : '',

                    '&:hover': {
                      background:
                        pathname === route.url
                          ? CustomTheme.palette.primary.main
                          : '',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarOpen ? 4 : 'auto',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 0.5,
                      fontSize: 20,
                      color:
                        pathname === route.url
                          ? CustomTheme.palette.custom.light
                          : CustomTheme.palette.secondary.dark,
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    sx={{
                      opacity: sidebarOpen ? 1 : 0,
                      color:
                        pathname === route.url
                          ? CustomTheme.palette.custom.light
                          : CustomTheme.palette.secondary.dark,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <ListItem disablePadding sx={{ display: 'block', px: 2, py: 1 }}>
          <ListItemButton
            sx={{
              minHeight: 44,
              justifyContent: sidebarOpen ? 'initial' : 'center',
              px: 2,
              py: 1,
              my: 1,
              borderRadius: 2,
              alignItems: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarOpen ? 4 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                mb: 0.5,
                fontSize: 20,
                color: CustomTheme.palette.custom.main,
              }}
            >
              <MdLogout />
            </ListItemIcon>
            <ListItemText
              primary='Logout'
              sx={{
                opacity: sidebarOpen ? 1 : 0,
                color: CustomTheme.palette.custom.main,
                '& *': {
                  fontWeight: 700,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          minHeight: '99vh',
          background: CustomTheme.palette.custom.light,
        }}
      >
        {/* <DrawerHeader /> */}
        <Box
          component='header'
          sx={{
            width: '100%',
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            py: { xs: 2, sm: 3, md: 4, lg: 6 },
            background:
              'linear-gradient(60deg, rgba(30, 33, 57, 1) 0%, rgba(124, 93, 250, 1) 80%);',
          }}
        >
          <Stack component='nav' direction='row' alignItems='center' gap={2}>
            <IconButton
              onClick={() =>
                sidebarOpen ? handleDrawerClose() : handleDrawerOpen()
              }
              sx={{ mb: 0.5, color: '#f5f5f5' }}
            >
              <Menu />
            </IconButton>
            <Typography
              fontSize={24}
              sx={{
                textTransform: 'uppercase',
                color: '#f5f5f5',
                fontWeight: 600,
              }}
            >
              {getPageName()}
            </Typography>
          </Stack>
        </Box>
        <Box className='animated-children'>{children}</Box>
      </Box>
    </Box>
  );
}
