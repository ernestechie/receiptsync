import { Box, Button, Stack, Typography, SwipeableDrawer } from '@mui/material';
import React from 'react';
import { ArrowLeft } from '@mui/icons-material';

export default function Drawer(props) {
  return (
    <SwipeableDrawer
      anchor={'right'}
      open={props.drawerState}
      onClose={() => props.toggleDrawer(false)}
      onOpen={() => props.toggleDrawer(true)}
      sx={{
        '& .MuiDrawer-paper': {
          p: 4,
          width: '100%',
          maxWidth: 512,
        },
      }}
    >
      <Stack
        sx={{ cursor: 'pointer' }}
        direction='row'
        alignItems='center'
        gap={1}
        mb={4}
        onClick={() => props.toggleDrawer(!props.drawerState)}
      >
        <ArrowLeft />
        <Typography fontWeight={600}>Go back</Typography>
      </Stack>
      <Typography fontWeight={700} fontSize={24} mb={4}>
        {props.heading}
      </Typography>

      <Box>{props.children}</Box>
    </SwipeableDrawer>
  );
}
