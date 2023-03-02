import React from 'react';
import { Box, Typography } from '@mui/material';
import ReceiptCard from '../Receipt/ReceiptCard';
import { receipts } from '../../static/receipts';

const RecentSales = () => {
  return (
    <Box my={6}>
      <Typography fontSize={20} fontWeight={500} mb={2}>
        Recent Sales
      </Typography>
      {[...receipts.sort((a, b) => b.dateCreated - a.dateCreated)]
        .splice(0, 5)
        .map((receipt) => (
          <ReceiptCard key={receipt.receiptNumber} receipt={receipt} />
        ))}
    </Box>
  );
};

export default RecentSales;
