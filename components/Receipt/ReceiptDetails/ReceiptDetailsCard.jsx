import React from 'react';
import { ProductURL } from '../../../store/config/URL';
import { Box, Typography, Stack, Divider, Grid } from '@mui/material';
import { theme as CustomTheme } from '../../../pages/_app';
import { parseDate } from '../../../utils/parseDate';
import { parseNigerianNaira } from '../../../utils/parseCurrency';

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
        boxShadow: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)',
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
          <Typography
            fontWeight={600}
            fontSize={20}
            color='secondary.dark'
            textTransform='capitalize'
          >
            {receipt?.customer.name}
          </Typography>
          <Typography
            fontWeight={400}
            color='secondary.contrastText'
            textTransform='capitalize'
          >
            {receipt?.customer.address.street},
          </Typography>
          <Typography
            fontWeight={400}
            color='secondary.contrastText'
            textTransform='capitalize'
          >
            {receipt?.customer.address.city},
          </Typography>
          <Typography
            fontWeight={400}
            color='secondary.contrastText'
            textTransform='capitalize'
          >
            {receipt?.customer.address.state}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Send To
          </Typography>
          <Typography fontWeight={600} fontSize={18} color='secondary.dark'>
            {receipt?.customer.email}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Date Issued
          </Typography>
          <Typography fontWeight={600} fontSize={18} color='secondary.dark'>
            {parseDate(receipt?.dateIssued)}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} width='100%' mb={4}>
          <Typography fontWeight={400} color='secondary.contrastText' mb={1}>
            Last Updated
          </Typography>
          <Typography fontWeight={600} fontSize={18} color='secondary.dark'>
            {parseDate(receipt?.updatedAt)}
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
          <Box key={item._id} my={1}>
            <Stack px={2} py={1} direction='row' justifyContent='space-between'>
              <Stack direction='row' gap={2}>
                <Box
                  width={80}
                  height={80}
                  sx={{
                    borderRadius: 2,
                    background: `url(${ProductURL}${item.imageName}) no-repeat center center/cover`,
                  }}
                />
                <Box>
                  <Typography
                    fontSize={16}
                    fontWeight={600}
                    textTransform='uppercase'
                  >
                    {item?.productName}
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
                      {item?.qty} x{parseNigerianNaira(item?.price)}
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
                <Typography color='secondary.contrastText'>Total: </Typography>
                <Typography fontSize={18} fontWeight={600}>
                  {parseNigerianNaira(item?.qty * item?.price)}
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
                {parseNigerianNaira(item?.qty * item?.price)}
              </Typography>
            </Stack>
            <Divider />
          </Box>
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
            {parseNigerianNaira(receipt?.totalPrice)}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ReceiptDetailsCard;
