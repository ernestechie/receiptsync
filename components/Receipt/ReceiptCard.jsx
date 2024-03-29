import { Grid, Typography } from '@mui/material';
import React from 'react';
import { parseDate } from '../../utils/parseDate';
import { parseNigerianNaira } from '../../utils/parseCurrency';
import { theme as CustomTheme } from '../../pages/_app';
import Link from 'next/link';

const ReceiptCard = ({ receipt }) => {
  return (
    <Link
      href={`/vendor/receipts/${receipt?._id}`}
      style={{ maxWidth: 1024, margin: 'auto', display: 'block' }}
    >
      <Grid
        container
        mx='auto'
        columnSpacing={{ sm: 1 }}
        columns={12}
        sx={{
          my: 2,
          py: 3,
          px: 4,
          minHeight: '80px',
          bgcolor: '#fff',
          borderRadius: '8px',
          transition: '0.3s ease-in',
          border: '1px solid #fff',
          alignItems: 'center',
          mx: 'auto !important',
          boxShadow: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)',
          width: '100%',

          '&:hover': {
            border: `1px solid ${CustomTheme.palette.secondary.contrastText}`,
            transition: '0.3s ease-out',
          },
        }}
      >
        <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
          <Typography fontSize={16} fontWeight={700}>
            #{receipt.receiptNumber}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
          <Typography
            fontWeight={500}
            color='secondary.contrastText'
            sx={{ textAlign: { xs: 'right', sm: 'left' } }}
            fontSize={14}
          >
            {parseDate(receipt?.dateIssued)}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
          <Typography
            fontWeight={500}
            color='secondary.contrastText'
            textTransform='capitalize'
          >
            {receipt?.customer.name}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4} md={3} width='100%' sx={{ py: 1 }}>
          <Typography
            fontSize={20}
            fontWeight={700}
            sx={{ textAlign: { xs: 'right', sm: 'left' } }}
          >
            {parseNigerianNaira(receipt?.totalPrice)}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

export default ReceiptCard;
