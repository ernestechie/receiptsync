import React from 'react';
import { Box, Typography, Stack, Divider, Grid } from '@mui/material';
import { theme as CustomTheme } from '../../../pages/_app';
import { parseDate } from '../../../utils/parseDate';

const ReceiptDetailsCard = ({ receipt }) => {
  return (
    <Box
      sx={{
        p: { xs: 3, sm: 4 },
        mx: 'auto',
        bgcolor: '#fff',
        borderRadius: 2,
        width: '100%',
        maxWidth: '768px',
        mt: { xs: 2, sm: 3 },
      }}
    >
      <Grid
        container
        mx='auto'
        rowSpacing={{ xs: 3, sm: 3, md: 0 }}
        columnSpacing={{ xs: 2, sm: 2 }}
        columns={12}
        mb={4}
      >
        <Grid item xs={6} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Bill To
          </Typography>
          <Typography fontWeight={600} fontSize={20} color='secondary.dark'>
            {receipt.customer.name}
          </Typography>
          <Typography fontWeight={400} color='secondary.contrastText'>
            {receipt.customer.address.street},
          </Typography>
          <Typography fontWeight={400} color='secondary.contrastText'>
            {receipt.customer.address.city},
          </Typography>
          <Typography fontWeight={400} color='secondary.contrastText'>
            {receipt.customer.address.state}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Send To
          </Typography>
          <Typography fontWeight={600} fontSize={18} color='secondary.dark'>
            {receipt.customer.sendTo}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Date Created
          </Typography>
          <Typography fontWeight={600} fontSize={18} color='secondary.dark'>
            {parseDate(receipt.dateCreated)}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Last Updated
          </Typography>
          <Typography fontWeight={600} fontSize={18} color='secondary.dark'>
            {parseDate(receipt.dateUpdated)}
          </Typography>
        </Grid>
      </Grid>
      {/*  */}
      <Box
        sx={{
          borderRadius: 2,
          p: 1,
          paddingBottom: 12,
          position: 'relative',
          bgcolor: CustomTheme.palette.custom.light,
        }}
      >
        {receipt.items.map((item) => (
          <>
            <Box key={item.id} my={1}>
              <Stack
                px={2}
                py={1}
                direction='row'
                justifyContent='space-between'
              >
                <Stack direction='row' gap={2}>
                  <Box
                    width={80}
                    height={80}
                    sx={{
                      borderRadius: 2,
                      background: `url(${item.image}) no-repeat center center/cover`,
                    }}
                  />
                  <Box>
                    <Typography
                      fontSize={16}
                      fontWeight={600}
                      textTransform='uppercase'
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      color='secondary.contrastText'
                      sx={{
                        display: 'flex',
                        width: '100%',
                        gap: 1,
                      }}
                    >
                      <Typography component='span' fontSize='inherit'>
                        {item.quantity} x N{item.price.toLocaleString()}
                      </Typography>
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction='row'
                  gap={2}
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    justifySelf: 'flex-end',
                  }}
                >
                  <Typography color='secondary.contrastText'>
                    Total:{' '}
                  </Typography>
                  <Typography fontSize={18} fontWeight={600}>
                    N{(item.quantity * item.price).toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
              {/*  */}
              <Stack
                direction='row'
                justifyContent='space-between'
                px={2}
                mt={1}
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  textAlign: 'right',
                  width: '100%',
                }}
              >
                <Typography color='secondary.contrastText'>Total</Typography>
                <Typography fontSize={18} fontWeight={600}>
                  N{(item.quantity * item.price).toLocaleString()}
                </Typography>
              </Stack>
            </Box>
            <Divider />
          </>
        ))}

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            bgcolor: CustomTheme.palette.secondary.dark,
            p: 3,
            width: '100%',
            borderRadius: '0 0 8px 8px',
            color: '#fff',
          }}
        >
          <Typography fontSize={16}>Grand Total:</Typography>
          <Typography fontSize={24} fontWeight={800}>
            N{receipt.totalPrice.toLocaleString()}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ReceiptDetailsCard;
